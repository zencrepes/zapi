import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('config/datasets', () => {
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

  it('Get a list of datasets', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: gql`
        query {
          config {
            datasets {
              totalCount
              nodes {
                name
                id
              }
            }
          }
        }
      `,
      variables: {},
    });

    expect(result.data.config.datasets.totalCount).toBeGreaterThan(0);

    expect(result.data.config.datasets.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'githubPullrequests' }),
        expect.objectContaining({ name: 'Pull Requests' }),
      ]),
    );
  });
});
