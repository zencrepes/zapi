import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubPullrequests/config', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

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

  it('Get list of available aggregations', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: gql`
        query {
          githubPullrequests {
            config {
              aggregations {
                totalCount
                nodes {
                  field
                  facetType
                  name
                  default
                }
              }
            }
          }
        }
      `,
      variables: {},
    });

    expect(result.data.githubPullrequests.config.aggregations.totalCount).toBeGreaterThan(5);
    expect(result.data).toMatchSnapshot();
  });
});
