import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EsService } from '../../es.service';

@Injectable()
export default class DatasetsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async fetchItems(): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
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
      nodes: results.hits.map(hit => {
        return { ...hit._source, id: hit._id };
      }),
      totalCount: results.total.value,
    };
  }

  async fetchItem(id: string): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
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

    return results.find(hit => hit.id === id);
  }
}
