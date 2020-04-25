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

  it('State aggregation without a query', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'state', query: '{}' },
    });

    expect(result.data).toMatchSnapshot();
  });

  it('State aggregation with a query not containing state', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'state',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"labels.edges.node.name.keyword","value":["enhancement"]}}]}',
      },
    });

    expect(result.data).toMatchSnapshot();
  });

  it('State aggregation with a query containing state', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'state',
        query: '{"op":"and","content":[{"op":"in","content":{"field":"state","value":["CLOSED"]}}]}',
      },
    });

    expect(result.data).toMatchSnapshot();
  });

  it('Labels aggregation (nested field) without a query', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'labels.edges.node.name.keyword', query: '{}' },
    });

    expect(result.data).toMatchSnapshot();
  });

  it('Labels aggregation (nested field) with a query not containing the field', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'labels.edges.node.name.keyword',
        query: '{"op":"and","content":[{"op":"in","content":{"field":"state","value":["CLOSED"]}}]}',
      },
    });

    expect(result.data).toMatchSnapshot();
  });

  it('Labels aggregation (nested field) with a query containing the field', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'labels.edges.node.name.keyword',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"labels.edges.node.name.keyword","value":["enhancement"]}}]}',
      },
    });

    expect(result.data).toMatchSnapshot();
  });
});
