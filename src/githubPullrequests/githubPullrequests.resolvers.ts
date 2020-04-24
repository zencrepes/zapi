import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import GithubPullrequests from './githubPullrequests.type';
import GithubPullrequestsData from './data/data.type';
import GithubPullrequestsConfig from './config/config.type';

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
      match_all: {},
    };
  }
  return JSON.stringify(updatedQuery);
};

// https://github.com/nestjs/graphql/issues/475
@Resolver(GithubPullrequests)
export default class GithubPullrequestsResolver {
  @Query(() => GithubPullrequests, {
    name: 'githubPullrequests',
    description: 'Fetch data (items, aggregatiosn) related to GitHub PRs',
  })
  public async geGithubPullrequests(): Promise<GithubPullrequests> {
    return new GithubPullrequests();
  }

  @ResolveProperty(() => GithubPullrequestsData, {
    name: 'data',
    description:
      'Access to the dataset as individual items, aggregations and more',
  })
  public async getData(
    @Args({
      name: 'query',
      type: () => String,
      description: 'Query used to filter down content',
      nullable: true,
    })
    query: string,
    @Parent() parent: GithubPullrequests,
  ): Promise<GithubPullrequestsData> {
    const data = new GithubPullrequestsData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    return data;
  }

  @ResolveProperty(() => GithubPullrequestsConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  public async getConfig(
    @Parent() parent: GithubPullrequests,
  ): Promise<GithubPullrequestsConfig> {
    return new GithubPullrequestsConfig();
  }
}