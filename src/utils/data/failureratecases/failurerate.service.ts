import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../../esClient.service';

import { getFailureRateCases } from '../../es/getFailureRateCases';

@Injectable()
export default class DataFailureRateCasesService {
  constructor(private readonly esClientService: EsClientService) {}

  async getFailure(esIndex: string, dateInterval: string, field: string, datefield: string, buckets: number, query: any, ): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    return await getFailureRateCases(esClient, esIndex, dateInterval, field, datefield, buckets, query);
  }
}
