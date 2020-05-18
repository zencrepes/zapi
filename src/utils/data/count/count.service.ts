import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../query';

@Injectable()
export default class DataCountService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async getCount(query, esIndex): Promise<any> {
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

    const countDocuments: ApiResponse = await this.esClient.count({
      index: esIndex,
      body: {
        query: updatedQuery,
      },
    });
    const docCount = countDocuments.body.count;
    return docCount;
  }
}
