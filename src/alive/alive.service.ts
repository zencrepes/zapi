import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import esClient from '../utils/es/esClient';

import { EsClientSettings } from '../types';

@Injectable()
export class AliveService {
  async getAlive(EsSettings: EsClientSettings): Promise<any> {
    const client = await esClient(EsSettings);
    const connectedUser: ApiResponse = await client.security.authenticate();
    return connectedUser;
  }
}
