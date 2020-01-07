import { Injectable } from '@nestjs/common';
import { Type } from '../graphql.schema';
import { Client } from '@elastic/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';

@Injectable()
export class TypesService {
  private readonly types: Type[] = [
    { id: 'abcd', active: true, index: 'cdef', key: 'ghij' },
  ];

  async findAll(): Promise<any> {
    const esClient = new Client({
      node: 'http://127.0.0.1:9200',
    });
    const types: ApiResponse = await esClient.search({
      index: 'types',
      body: {
        from: 0,
        size: 10000,
        query: {
          match_all: {},
        },
      },
    });
    return types.body.hits.hits.map(hit => hit._source);
  }

  findOneById(id: string): Type {
    return this.types.find(type => type.id === id);
  }
}
