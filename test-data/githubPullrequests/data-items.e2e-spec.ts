import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

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
              closedAt
              assignees {
                edges {
                  node {
                    login
                    name
                    avatarUrl
                  }
                }
                totalCount
              }
              reviewRequests {
                totalCount
                edges {
                  node {
                    requestedReviewer {
                      login
                      avatarUrl
                      url
                    }
                  }
                }
              }
              reviews {
                totalCount
                edges {
                  node {
                    author {
                      login
                      url
                      avatarUrl
                    }
                  }
                }
              }
              author {
                url
                avatarUrl
                login
              }
              labels {
                totalCount
                edges {
                  node {
                    name
                    color
                  }
                }
              }
              title
              repository {
                name
                url
                owner {
                  id
                  login
                  url
                }
              }
              milestone {
                title
              }
              state
              url
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

  it('Get first page of items, no query, sorted by date asc', async () => {
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

    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
    expect(result.data).toMatchSnapshot();
  });

  it('Get first page of items, no query, sorted by date desc', async () => {
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
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
    expect(result.data).toMatchSnapshot();
  });

  it('Get second page of items, no query, sorted by date asc', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 10,
        size: 20,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'asc',
      },
    });
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(20);
    expect(result.data).toMatchSnapshot();
  });

  it('Get first page of items, query with nested, sorted by date asc', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"state","value":["MERGED"]}},{"op":"in","content":{"field":"reviews.edges.node.author.login","value":["hlminh2000"]}}]}',
        sortField: 'createdAt',
        sortDirection: 'asc',
      },
    });
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
    expect(result.data).toMatchSnapshot();
  });

  it('Get second page of items, query with nested, sorted by date asc', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 10,
        size: 20,
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"state","value":["MERGED"]}},{"op":"in","content":{"field":"reviews.edges.node.author.login","value":["hlminh2000"]}}]}',
        sortField: 'createdAt',
        sortDirection: 'asc',
      },
    });
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(20);
    expect(result.data).toMatchSnapshot();
  });

  it('Get first page of items, no query, sorted by title desc', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'title.keyword',
        sortDirection: 'desc',
      },
    });
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
    expect(result.data).toMatchSnapshot();
  });

  it('Get first page of items, no query, sorted by title asc', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 10,
        query: '{}',
        sortField: 'title.keyword',
        sortDirection: 'desc',
      },
    });
    expect(result.data.githubPullrequests.data.items.nodes.length).toEqual(10);
    expect(result.data).toMatchSnapshot();
  });
});
