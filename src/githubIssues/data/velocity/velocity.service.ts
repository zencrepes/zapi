import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';

import { ConfService } from '../../../conf.service';

import { EsClientService } from '../../../esClient.service';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';

import getTermAggregation from '../../../utils/es/getTermAggregation';
import getDateHistogramAggregation from '../../../utils/es/getDateHistogramAggregation';

@Injectable()
export default class DataVelocityService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  async getVelocity(interval: string, moving: number, window: number, query: any): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    const userConfig = this.confService.getUserConfig();

    //1- Convert the SQON query to an ES query
    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);
    const prepQuery = {
      nestedFields,
      filters: queryObj,
    };
    let updatedQuery = await buildQuery(prepQuery);
    if (Object.entries(updatedQuery).length === 0) {
      updatedQuery = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      };
    }

    const esIndex = userConfig.elasticsearch.dataIndices.githubIssues + '*';

    // Velocity is calculated by aggregated individual velocity for all of the assignees across the entire dataset
    // The first step consists then in getting those assignees by running an aggregations on assigneesQuery
    // If assigneesQuery is not provided, using query

    // 1- Get list of all assignees
    const aggAssignees = await getTermAggregation(esClient, esIndex, queryObj, 'assignees.edges.node.login', {}, false);
    const assignees = aggAssignees.buckets
      .filter((a: any) => a.key !== '__missing__')
      .map((a: any) => {
        return { login: a.key };
      });

    // 2- Construct a SQON query filtering on those assignees across the entire dataset
    // We're intersted in the past 52 months, so filtering on 52 + moving
    const sqonAssignees = {
      op: 'and',
      content: [
        {
          op: 'in',
          content: {
            field: 'assignees.edges.node.login',
            value: assignees.map((a: any) => a.login),
          },
        },
        {
          op: '>=',
          content: {
            field: 'closedAt',
            value: sub(new Date(), { weeks: window + moving }).toISOString(),
          },
        },
      ],
    };

    const aggBuckets = await getDateHistogramAggregation(esClient, esIndex, sqonAssignees, 'closedAt', {
      calendarInterval: interval,
      movingWindow: moving,
      sumField: 'points',
    });
    const items = aggBuckets.buckets.slice(4).map((b: any) => {
      return {
        date: b.keyAsString,
        issues: { sum: b.docCount, moving: b.moving },
        points: { sum: b.sum, moving: b.movingPts },
      };
    });

    return { assignees, items: items, current: items[items.length - 1] };
  }
}
