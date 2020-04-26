import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubPullrequests/data/activity', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_FACET = gql`
    query($query: String, $field: String!, $dateField: String!) {
      githubPullrequests {
        data(query: $query) {
          activity(dateField: $dateField, field: $field) {
            field
            fromWeekStart
            toWeekStart
            buckets {
              key
              docCount
              weeks {
                weekStart
                docCount
              }
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

  it('Get repository activity by createdAt, no query', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'repository.name.keyword', query: '{}', dateField: 'createdAt' },
    });

    expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
    expect(result.data).toMatchSnapshot();
  });

  it('Get repository activity by createdAt, with query', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'repository.name.keyword',
        query: '{"op":"and","content":[{"op":"in","content":{"field":"author.login","value":["Fgerthoffert"]}}]}',
        dateField: 'createdAt',
      },
    });
    expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
    expect(result.data).toMatchSnapshot();
  });

  it('Get repository activity by createdAt, query with nested field', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'repository.name.keyword',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"reviews.edges.node.author.login","value":["Fgerthoffert"]}}]}',
        dateField: 'createdAt',
      },
    });

    expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
    expect(result.data).toMatchSnapshot();
  });

  // it('Get labels (nested field) activity by createdAt, no query', async () => {
  //   const { query } = apolloClient;
  //   const result: any = await query({
  //     query: GET_FACET,
  //     variables: {
  //       field: 'labels.edges.node.name.keyword',
  //       query: '{}',
  //       dateField: 'createdAt',
  //     },
  //   });

  //   expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
  //   expect(result.data).toMatchSnapshot();
  // });

  // it('Get labels (nested field) activity by createdAt, with query', async () => {
  //   const { query } = apolloClient;
  //   const result: any = await query({
  //     query: GET_FACET,
  //     variables: {
  //       field: 'labels.edges.node.name.keyword',
  //       query: '{"op":"and","content":[{"op":"in","content":{"field":"author.login","value":["Fgerthoffert"]}}]}',
  //       dateField: 'createdAt',
  //     },
  //   });

  //   expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
  //   expect(result.data).toMatchSnapshot();
  // });

  // it('Get labels (nested field) activity by createdAt, query with nested field', async () => {
  //   const { query } = apolloClient;
  //   const result: any = await query({
  //     query: GET_FACET,
  //     variables: {
  //       field: 'labels.edges.node.name.keyword',
  //       query:
  //         '{"op":"and","content":[{"op":"in","content":{"field":"reviews.edges.node.author.login","value":["Fgerthoffert"]}}]}',
  //       dateField: 'createdAt',
  //     },
  //   });

  //   expect(result.data.githubPullrequests.data.activity.buckets.length).toBeGreaterThan(2);
  //   expect(result.data).toMatchSnapshot();
  // });
});
