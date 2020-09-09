import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { buildQuery } from '@arranger/middleware';
import { ConfService } from '../conf.service';

import GithubWatchers from './githubWatchers.type';
import GithubWatchersData from './data/data.type';
import GithubWatchersConfig from './config/config.type';

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
      match_all: {},
    };
  }
  return JSON.stringify(updatedQuery);
};

// https://github.com/nestjs/graphql/issues/475
@Resolver(GithubWatchers)
export default class GithubWatchersResolver {
  constructor(private readonly confService: ConfService, private readonly countService: DataCountService) {}

  @Query(() => GithubWatchers, {
    name: 'githubWatchers',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geGithubWatchers(): Promise<GithubWatchers> {
    return new GithubWatchers();
  }

  @ResolveField(() => GithubWatchersData, {
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
    @Parent() parent: GithubWatchers,
  ): Promise<GithubWatchersData> {
    const userConfig = this.confService.getUserConfig();

    const data = new GithubWatchersData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, userConfig.elasticsearch.dataIndices.githubWatchers + '*');
    return data;
  }

  @ResolveField(() => GithubWatchersConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubWatchers): Promise<GithubWatchersConfig> {
    return new GithubWatchersConfig();
  }
}
