import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import GithubIssues from './githubIssues.type';
import GithubIssuesData from './data/data.type';
import GithubIssuesConfig from './config/config.type';

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
@Resolver(GithubIssues)
export default class GithubIssuesResolver {
  constructor(private readonly countService: DataCountService) {}

  @Query(() => GithubIssues, {
    name: 'githubIssues',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geGithubIssues(): Promise<GithubIssues> {
    return new GithubIssues();
  }

  @ResolveField(() => GithubIssuesData, {
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
    @Parent() parent: GithubIssues,
  ): Promise<GithubIssuesData> {
    const data = new GithubIssuesData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, 'gh_issues_');
    return data;
  }

  @ResolveField(() => GithubIssuesConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubIssues): Promise<GithubIssuesConfig> {
    return new GithubIssuesConfig();
  }
}
