import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../conf.service';

import GithubLabels from './githubLabels.type';
import GithubLabelsData from './data/data.type';
import GithubLabelsConfig from './config/config.type';

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
@Resolver(GithubLabels)
export default class GithubLabelsResolver {
  constructor(private readonly confService: ConfService, private readonly countService: DataCountService) {}

  @Query(() => GithubLabels, {
    name: 'githubLabels',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geGithubLabels(): Promise<GithubLabels> {
    return new GithubLabels();
  }

  @ResolveField(() => GithubLabelsData, {
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
    @Parent() parent: GithubLabels,
  ): Promise<GithubLabelsData> {
    const userConfig = this.confService.getUserConfig();

    const data = new GithubLabelsData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, userConfig.elasticsearch.dataIndices.githubLabels + '*');

    return data;
  }

  @ResolveField(() => GithubLabelsConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubLabels): Promise<GithubLabelsConfig> {
    return new GithubLabelsConfig();
  }
}
