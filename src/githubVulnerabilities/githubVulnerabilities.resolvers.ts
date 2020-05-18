import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import GithubVulnerabilities from './githubVulnerabilities.type';
import GithubVulnerabilitiesData from './data/data.type';
import GithubVulnerabilitiesConfig from './config/config.type';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../utils/query';
import DataCountService from '../utils/data/count/count.service';

const getEsQuery = async (query: string) => {
  const queryObj = JSON.parse(query);
  const nestedFields = getNestedFields(queryObj);

  const prepQuery = {
    nestedFields,
    filters: queryObj,
  };

  let updatedQuery = await buildQuery(prepQuery);
  if (Object.entries(updatedQuery).length === 0) {
    updatedQuery = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      match_all: {},
    };
  }
  return JSON.stringify(updatedQuery);
};

// https://github.com/nestjs/graphql/issues/475
@Resolver(GithubVulnerabilities)
export default class GithubVulnerabilitiesResolver {
  constructor(private readonly countService: DataCountService) {}

  @Query(() => GithubVulnerabilities, {
    name: 'githubVulnerabilities',
    description: 'Fetch data (items, aggregatiosn) related to GitHub PRs',
  })
  public async geGithubVulnerabilities(): Promise<GithubVulnerabilities> {
    return new GithubVulnerabilities();
  }

  @ResolveField(() => GithubVulnerabilitiesData, {
    name: 'data',
    description: 'Access to the dataset as individual items, aggregations and more',
  })
  public async getData(
    @Args({
      name: 'query',
      type: () => String,
      description: 'Query used to filter down content',
      nullable: true,
    })
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Parent() parent: GithubVulnerabilities,
  ): Promise<GithubVulnerabilitiesData> {
    const data = new GithubVulnerabilitiesData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, 'j_issues_');
    return data;
  }

  @ResolveField(() => GithubVulnerabilitiesConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubVulnerabilities): Promise<GithubVulnerabilitiesConfig> {
    return new GithubVulnerabilitiesConfig();
  }
}
