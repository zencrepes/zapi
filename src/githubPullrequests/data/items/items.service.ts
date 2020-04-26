import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';

@Injectable()
export default class DataItemsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(from, size, query, orderBy): Promise<any> {
    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);

    let sort: Array<any> = ['_score'];
    if (orderBy !== undefined) {
      const customSort = {};
      customSort[orderBy.field] = { order: orderBy.direction };
      sort = [customSort, ...sort];
    }
    // console.log(orderBy);
    // console.log(sort);
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

    // console.log('Query Transformation: ');
    // console.log(JSON.stringify(queryObj));
    // console.log(JSON.stringify(updatedQuery));

    // const esClient = new Client({
    //   node: 'http://127.0.0.1:9200',
    // });
    const datasets: ApiResponse = await this.esClient.search({
      index: 'gh_prs_',
      body: {
        from: from === undefined ? 0 : from,
        size: from === undefined ? 10 : size,
        query: updatedQuery,
        sort,
      },
    });
    const results = datasets.body.hits;
    return {
      nodes: results.hits.map(hit => hit._source),
      totalCount: results.total.value,
    };
  }

  async findOneById(id: string): Promise<any> {
    return {
      id: 'One single item, provided: ' + id,
    };
  }
}
