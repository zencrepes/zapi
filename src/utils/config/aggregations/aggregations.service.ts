import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { EsClientService } from '../../../esClient.service';

@Injectable()
export default class ConfigAggregationsService {
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(datasetId: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const datasets: ApiResponse = await esClient.search({
      index: 'config',
      body: {
        from: 0,
        size: 200,
        _source: ['facets'],
        query: {
          match_phrase: { id: datasetId },
        },
      },
    });
    const results = datasets.body.hits.hits;
    if (results.length > 0) {
      return {
        nodes: results[0]._source.facets.map((d: any) => {
          return { ...d, id: d.name };
        }),
        totalCount: results[0]._source.facets.length,
      };
    }
    return { nodes: [], totalCount: 0 };
  }
}
