// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html
import { Client } from '@elastic/elasticsearch';
import { EsClientSettings } from '../../types';
import * as fs from 'fs';

function esClient(p: EsClientSettings) {
  const {
    cfg_es_type,
    cfg_es_host,
    cfg_ess_id,
    cfg_ess_username,
    cfg_ess_password,
  } = p;

  if (cfg_es_type === 'elasticcloud') {
    return new Client({
      cloud: {
        id: cfg_ess_id,
        username: cfg_ess_username,
        password: cfg_ess_password,
      },
    });
  } else if (cfg_es_type === 'elasticsearch' && cfg_es_host !== '') {
    return new Client({
      node: cfg_es_host,
    });
  }
}
export default esClient;
