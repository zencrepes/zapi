import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';
import { isConstructorDeclaration } from 'typescript';

//https://github.com/nestjs/nest/issues/484
/*
  High-level set of tests, verify basic variables
*/
describe('githubPullrequests/data/items', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_ITEMS = gql`
    query($from: Int, $size: Int, $query: String, $sortField: String, $sortDirection: OrderDirection!) {
      githubPullrequests {
        data(query: $query) {
          items(from: $from, size: $size, orderBy: { direction: $sortDirection, field: $sortField }) {
            totalCount
            nodes {
              id
              createdAt
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

  it('Get ITEMS => NO QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    expect(result.data.githubPullrequests.data.items.totalCount).toBeGreaterThan(20);
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
  });

  // With a query, totalCount is expected to be less
  it('Get ITEMS => WITH QUERY', async () => {
    const { query } = apolloClient;
    const baseline: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"repository.name.keyword","value":["zencrepes"]}}]}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    expect(result.data.githubPullrequests.data.items.totalCount).toBeLessThan(
      baseline.data.githubPullrequests.data.items.totalCount,
    );
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
  });

  it('Validate sorting desc', async () => {
    const { query } = apolloClient;

    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    const firstResult = result.data.githubPullrequests.data.items.nodes[0];
    const fifthResult = result.data.githubPullrequests.data.items.nodes[5];

    expect(new Date(firstResult.createdAt).getTime()).toBeGreaterThan(new Date(fifthResult.createdAt).getTime());
  });

  it('Validate sorting asc', async () => {
    const { query } = apolloClient;

    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'asc',
      },
    });

    const firstResult = result.data.githubPullrequests.data.items.nodes[0];
    const fifthResult = result.data.githubPullrequests.data.items.nodes[5];

    expect(new Date(firstResult.createdAt).getTime()).toBeLessThan(new Date(fifthResult.createdAt).getTime());
  });

  it('Validate pagination', async () => {
    const { query } = apolloClient;
    const baseline: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 50,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    const resultA: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    expect(resultA.data.githubPullrequests.data.items.nodes[0].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[0].id,
    );

    expect(resultA.data.githubPullrequests.data.items.nodes[9].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[9].id,
    );

    expect(resultA.data.githubPullrequests.data.items.nodes[10]).toBeUndefined();

    const resultB: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 11,
        size: 10,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    expect(resultB.data.githubPullrequests.data.items.nodes[0].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[11].id,
    );

    expect(resultB.data.githubPullrequests.data.items.nodes[9].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[20].id,
    );

    const resultC: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 35,
        size: 5,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'desc',
      },
    });

    expect(resultC.data.githubPullrequests.data.items.nodes.length).toEqual(5);

    expect(resultC.data.githubPullrequests.data.items.nodes[0].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[35].id,
    );

    expect(resultC.data.githubPullrequests.data.items.nodes[4].id).toEqual(
      baseline.data.githubPullrequests.data.items.nodes[39].id,
    );
  });
});
