import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubPullrequests/data/aggregations', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_FACET = gql`
    query($field: String!, $query: String) {
      githubPullrequests {
        data(query: $query) {
          aggregations(field: $field) {
            field
            buckets {
              docCount
              key
            }
          }
        }
      }
    }
  `;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const module: GraphQLModule = moduleFixture.get<GraphQLModule>(GraphQLModule);
    // apolloServer is protected, we need to cast module to any to get it
    apolloClient = createTestClient((module as any).apolloServer);
  });

  it('Get STATE facet => NO QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'state', query: '{}' },
    });

    expect(result.data.githubPullrequests.data.aggregations.field).toEqual('state');

    const merged = result.data.githubPullrequests.data.aggregations.buckets.find(
      (b: { key: string }) => b.key === 'MERGED',
    );
    expect(merged).toBeDefined();
    expect(merged.key).toBeDefined();
    expect(merged.docCount).toBeDefined();
    expect(merged.docCount).toBeGreaterThan(5);
  });

  it('Get STATE facet => WITH QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'state',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"repository.name.keyword","value":["zencrepes"]}}]}',
      },
    });

    expect(result.data.githubPullrequests.data.aggregations.field).toEqual('state');

    const merged = result.data.githubPullrequests.data.aggregations.buckets.find(
      (b: { key: string }) => b.key === 'MERGED',
    );
    expect(merged).toBeDefined();
    expect(merged.key).toBeDefined();
    expect(merged.docCount).toBeDefined();
    expect(merged.docCount).toBeGreaterThan(5);
  });
});
