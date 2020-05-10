import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubVulnerabilities/data/items', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_ITEMS = gql`
    query($from: Int, $size: Int, $query: String, $sortField: String, $sortDirection: OrderDirection!) {
      githubVulnerabilities {
        data(query: $query) {
          items(from: $from, size: $size, orderBy: { direction: $sortDirection, field: $sortField }) {
            totalCount
            nodes {
              id
              createdAt
              dismissReason
              dismissedAt
              dismisser {
                login
                avatarUrl
                url
              }
              repository {
                id
                name
                url
                databaseId
                owner {
                  id
                  login
                  url
                }
              }
              vulnerableManifestPath
              vulnerableManifestFilename
              vulnerableRequirements
              securityVulnerability {
                updatedAt
                advisory {
                  id
                  publishedAt
                  origin
                  summary
                  description
                  severity
                  ghsaId
                  permalink
                }
                firstPatchedVersion {
                  identifier
                }
                package {
                  ecosystem
                  name
                }
                severity
                vulnerableVersionRange
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

    expect(result.data.githubVulnerabilities.data.items.nodes.length).toEqual(10);
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
    expect(result.data.githubVulnerabilities.data.items.nodes.length).toEqual(10);
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
    expect(result.data.githubVulnerabilities.data.items.nodes.length).toEqual(20);
    expect(result.data).toMatchSnapshot();
  });
});
