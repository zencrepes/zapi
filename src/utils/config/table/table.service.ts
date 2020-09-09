import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { EsClientService } from '../../../esClient.service';

@Injectable()
export default class ConfigTableService {
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(datasetId: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const datasets: ApiResponse = await esClient.search({
      index: 'config',
      body: {
        from: 0,
        size: 200,
        _source: ['tableConfig'],
        query: {
          match_phrase: { id: datasetId },
        },
      },
    });
    const results = datasets.body.hits.hits;
    if (results.length > 0) {
      return {
        columns: results[0]._source.tableConfig.columns.map((c: any) => {
          return { ...c, id: c.name };
        }),
        itemsType: results[0]._source.tableConfig.itemsType,
        defaultSortField: results[0]._source.tableConfig.defaultSortField,
      };
    }
    return { columns: [], itemsType: null };
  }
}
