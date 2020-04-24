import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export default class DatasetsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
      index: 'config',
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
      nodes: results.hits.map(hit => {
        return { ...hit._source, id: hit._id };
      }),
      totalCount: results.total.value,
    };
  }

  async findOneById(id: string): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
      index: 'config',
      body: {
        from: 0,
        size: 10000,
        query: {
          match_all: {},
        },
      },
    });
    const results = datasets.body.hits;

    return results.find(hit => hit.id === id);
  }
}
