import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export default class ConfigAggregationsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(datasetId: string): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
      index: 'config',
      body: {
        from: 0,
        size: 200,
        _source: ['facets'],
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          match_phrase: { id: datasetId },
        },
      },
    });
    const results = datasets.body.hits.hits;
    if (results.length > 0) {
      return {
        nodes: results[0]._source.facets,
        totalCount: results[0]._source.facets.length,
      };
    }
    return { nodes: [], totalCount: 0 };
  }
}
