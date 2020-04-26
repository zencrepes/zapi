import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { clearCurrentField } from '../../../utils/query';

@Injectable()
export default class DataMetricsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async getMetrics(field: string, query: any): Promise<any> {
    // Run two query, to get min max for current, and min max without facet
    const esIndex = 'gh_prs_';

    const filteredQuery = clearCurrentField(JSON.parse(query), field);
    const prepFilteredQuery = {
      nestedFields: [],
      filters: filteredQuery,
    };

    let updatedFilteredQuery = await buildQuery(prepFilteredQuery);
    if (Object.entries(updatedFilteredQuery).length === 0) {
      updatedFilteredQuery = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      };
    }

    const filteredDatasets: ApiResponse = await this.esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: updatedFilteredQuery,
        aggs: {
          min: {
            min: {
              field,
            },
          },
          max: {
            max: {
              field,
            },
          },
        },
      },
    });
    const filteredRsults = filteredDatasets.body.aggregations;

    const unfilteredQuery = clearCurrentField(JSON.parse(query), field);
    const prepUnFilteredQuery = {
      nestedFields: [],
      filters: unfilteredQuery,
    };

    let updatedUnFilteredQuery = await buildQuery(prepUnFilteredQuery);
    if (Object.entries(updatedUnFilteredQuery).length === 0) {
      updatedUnFilteredQuery = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      };
    }

    const unfilteredDatasets: ApiResponse = await this.esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: updatedUnFilteredQuery,
        aggs: {
          min: {
            min: {
              field,
            },
          },
          max: {
            max: {
              field,
            },
          },
        },
      },
    });
    const unfilteredRsults = unfilteredDatasets.body.aggregations;

    return {
      max: filteredRsults.max.value,
      min: filteredRsults.min.value,
      overallMax: unfilteredRsults.max.value,
      overallMin: unfilteredRsults.min.value,
    };
  }
}
