import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { buildQuery } from '@arranger/middleware';

import { EsClientService } from '../../../esClient.service';
import { getNestedFields } from '../../query';

@Injectable()
export default class DataCountService {
  constructor(private readonly esClientService: EsClientService) {}

  async getCount(query, esIndex): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);

    const prepQuery = {
      nestedFields,
      filters: queryObj,
    };

    let updatedQuery = await buildQuery(prepQuery);

    if (Object.entries(updatedQuery).length === 0) {
      updatedQuery = {
        match_all: {},
      };
    }


    // Adding a filter not to return disabled documents
    updatedQuery = {
      bool: {
        must: updatedQuery,
        must_not: {term: {disabled: true}}
      }
    }

    const countDocuments: ApiResponse = await esClient.count({
      index: esIndex,
      body: {
        query: updatedQuery,
      },
    });
    const docCount = countDocuments.body.count;
    return docCount;
  }
}
