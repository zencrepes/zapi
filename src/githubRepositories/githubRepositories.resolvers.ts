import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import GithubRepositories from './githubRepositories.type';
import GithubRepositoriesData from './data/data.type';
import GithubRepositoriesConfig from './config/config.type';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../utils/query';

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
@Resolver(GithubRepositories)
export default class GithubRepositoriesResolver {
  @Query(() => GithubRepositories, {
    name: 'githubRepositories',
    description: 'Fetch data (items, aggregatiosn) related to GitHub PRs',
  })
  public async geGithubRepositories(): Promise<GithubRepositories> {
    return new GithubRepositories();
  }

  @ResolveField(() => GithubRepositoriesData, {
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
    @Parent() parent: GithubRepositories,
  ): Promise<GithubRepositoriesData> {
    const data = new GithubRepositoriesData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    return data;
  }

  @ResolveField(() => GithubRepositoriesConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubRepositories): Promise<GithubRepositoriesConfig> {
    return new GithubRepositoriesConfig();
  }
}
