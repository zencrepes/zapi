import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import { AppModule } from '../../src/app.module';

//https://github.com/nestjs/nest/issues/484

describe('githubVulnerabilities/data/aggregations', () => {
  let app: INestApplication;
  let apolloClient: ApolloServerTestClient;

  const GET_FACET = gql`
    query($field: String!, $query: String) {
      githubVulnerabilities {
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

  it('Severity aggregation without a query', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: { field: 'securityVulnerability.severity', query: '{}' },
    });

    expect(result.data.githubVulnerabilities.data.aggregations.buckets.length).toBeGreaterThan(2);
    expect(result.data).toMatchSnapshot();
  });

  it('Severity aggregation with a query not containing state', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'securityVulnerability.severity',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"securityVulnerability.package.ecosystem","value":["NPM"]}}]}',
      },
    });
    expect(result.data.githubVulnerabilities.data.aggregations.buckets.length).toBeGreaterThan(0);
    expect(result.data).toMatchSnapshot();
  });

  it('Severity aggregation with a query containing state', async () => {
    const { query } = apolloClient;
    const result: any = await query({
      query: GET_FACET,
      variables: {
        field: 'securityVulnerability.severity',
        query:
          '{"op":"and","content":[{"op":"in","content":{"field":"securityVulnerability.severity","value":["HIGH"]}}]}',
      },
    });

    expect(result.data.githubVulnerabilities.data.aggregations.buckets.length).toBeGreaterThan(2);
    expect(result.data).toMatchSnapshot();
  });
});
