import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../../esClient.service';

import { getFailureRate } from '../../es/getFailureRate';

@Injectable()
export default class DataFailureRateService {
  constructor(private readonly esClientService: EsClientService) {}

  async getFailure(esIndex: string, dateInterval: string, field: string, datefield: string, buckets: number, query: any, ): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    return await getFailureRate(esClient, esIndex, dateInterval, field, datefield, buckets, query);
  }
}
