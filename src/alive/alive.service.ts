import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import esClient from '../utils/es/esClient';

import { EsClientSettings } from '../types';

@Injectable()
export class AliveService {
  async getAlive(EsClientSettings: EsClientSettings): Promise<any> {
    const client = await esClient(EsClientSettings);
    const connectedUser: ApiResponse = await client.security.authenticate();
    return connectedUser;
  }
}
