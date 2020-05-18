import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export default class ConfigTableService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(datasetId: string): Promise<any> {
    const datasets: ApiResponse = await this.esClient.search({
      index: 'config',
      body: {
        from: 0,
        size: 200,
        _source: ['tableConfig'],
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          match_phrase: { id: datasetId },
        },
      },
    });
    const results = datasets.body.hits.hits;
    if (results.length > 0) {
      return {
        columns: results[0]._source.tableConfig.columns,
        itemsType: results[0]._source.tableConfig.itemsType,
      };
    }
    return { columns: [], itemsType: null };
  }
}
