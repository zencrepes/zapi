import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { EsClientService } from '../../esClient.service';

@Injectable()
export default class DatasetsService {
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const datasets: ApiResponse = await esClient.search({
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
      nodes: results.hits.map((hit) => {
        return { ...hit._source, id: hit._id };
      }),
      totalCount: results.total.value,
    };
  }

  async findOneById(id: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const datasets: ApiResponse = await esClient.search({
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

    return results.find((hit) => hit.id === id);
  }
}
