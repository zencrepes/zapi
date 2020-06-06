import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../../esClient.service';

import { getTermAggregation } from '../../es/getTermAggregation';
import { getDateHistogramAggregation } from '../../es/getDateHistogramAggregation';

@Injectable()
export default class DataAggregationsService {
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(field: string, query: any, aggType: string, aggOptions: string, esIndex: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const filterQuery = JSON.parse(query);
    // let aggOptions = JSON.parse(options);
    const aggregationType = aggType === undefined ? 'term' : aggType;
    const aggregationOptions = aggOptions === undefined ? {} : JSON.parse(aggOptions);
    if (aggregationType === 'term') {
      return await getTermAggregation(esClient, esIndex, filterQuery, field, aggregationOptions, true);
    }

    if (aggregationType === 'date_histogram') {
      return await getDateHistogramAggregation(esClient, esIndex, filterQuery, field, aggregationOptions);
    }
  }
}
