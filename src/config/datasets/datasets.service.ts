import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';

import Dataset from './dataset.type';

@Injectable()
export default class DatasetsService {
  private readonly datasets: Dataset[] = [
    { id: 'abcd', name: 'abcd', active: true, index: 'cdef', key: 'ghij' },
  ];

  async findAll(): Promise<any> {
    const esClient = new Client({
      node: 'http://127.0.0.1:9200',
    });
    const datasets: ApiResponse = await esClient.search({
      index: 'datasets',
      body: {
        from: 0,
        size: 10000,
        query: {
          match_all: {},
        },
      },
    });
    const results = datasets.body.hits;
    return {
      nodes: results.hits.map(hit => hit._source),
      totalCount: results.total.value,
    };
  }

  findOneById(id: string): Dataset {
    return this.datasets.find(dataset => dataset.id === id);
  }
}
