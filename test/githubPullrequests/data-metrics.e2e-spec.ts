import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubPullrequests/data/metrics', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_FACET = gql`
    query($field: String!, $query: String) {
      githubPullrequests {
        data(query: $query) {
          metrics(field: $field) {
            field
            overallMin
            overallMax
            min
            max
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

  it('Get COMMENTS metrics => NO QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'comments.totalCount', query: '{}' },
    });

    expect(result.data.githubPullrequests.data.metrics.field).toEqual('comments.totalCount');

    expect(result.data.githubPullrequests.data.metrics.max).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.min).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.overallMax).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.overallMin).toEqual(expect.any(Number));
  });

  it('Get STATE facet => WITH QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'comments.totalCount',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"repository.name.keyword","value":["zencrepes"]}}]}',
      },
    });

    expect(result.data.githubPullrequests.data.metrics.field).toEqual('comments.totalCount');
    expect(result.data.githubPullrequests.data.metrics.max).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.min).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.overallMax).toEqual(expect.any(Number));
    expect(result.data.githubPullrequests.data.metrics.overallMin).toEqual(expect.any(Number));
  });
});
