import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ConfService } from '../../../conf.service';

import { EsClientService } from '../../../esClient.service';

import { buildQuery } from '@arranger/middleware';

import { clearCurrentField, getNestedFields } from '../../../utils/query';

@Injectable()
export default class DataMetricsService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  async getMetrics(field: string, query: any): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    const userConfig = this.confService.getUserConfig();

    // Run two query, to get min max for current, and min max without facet
    const esIndex = userConfig.elasticsearch.dataIndices.githubIssues + '*';

    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);

    const filteredQuery = clearCurrentField(JSON.parse(query), field);
    const prepFilteredQuery = {
      nestedFields: nestedFields,
      filters: filteredQuery,
    };

    let updatedFilteredQuery = await buildQuery(prepFilteredQuery);
    if (Object.entries(updatedFilteredQuery).length === 0) {
      updatedFilteredQuery = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      };
    }

    const filteredEsQuery = {
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
          sum: {
            sum: {
              field,
            },
          },
        },
      },
    };
    const filteredDatasets: ApiResponse = await esClient.search(filteredEsQuery);
    const filteredRsults = filteredDatasets.body.aggregations;

    const countDocuments: ApiResponse = await esClient.count({
      index: esIndex,
      body: {
        query: updatedFilteredQuery,
      },
    });
    const docCount = countDocuments.body.count;

    const unfilteredQuery = clearCurrentField(JSON.parse(query), field);
    const prepUnFilteredQuery = {
      nestedFields: nestedFields,
      filters: unfilteredQuery,
    };

    let updatedUnFilteredQuery = await buildQuery(prepUnFilteredQuery);
    if (Object.entries(updatedUnFilteredQuery).length === 0) {
      updatedUnFilteredQuery = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        match_all: {},
      };
    }

    const unfilteredDatasets: ApiResponse = await esClient.search({
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
      count: docCount,
      max: filteredRsults.max.value,
      min: filteredRsults.min.value,
      sum: filteredRsults.sum.value,
      overallMax: unfilteredRsults.max.value,
      overallMin: unfilteredRsults.min.value,
    };
  }
}
