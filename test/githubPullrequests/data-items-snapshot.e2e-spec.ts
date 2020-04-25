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

  //Assumption is that the first ever PR will never change its content
  it('Get COMMENTS metrics => NO QUERY', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_ITEMS,
      variables: {
        from: 0,
        size: 1,
        query: '{}',
        sortField: 'createdAt',
        sortDirection: 'asc',
      },
    });

    expect(result.data.githubPullrequests.data.items.totalCount).toBeGreaterThan(5);

    expect(result.data.githubPullrequests.data.items.nodes[0]).toMatchSnapshot();
  });
});
