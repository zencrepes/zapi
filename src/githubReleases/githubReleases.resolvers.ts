import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { buildQuery } from '@arranger/middleware';
import { ConfService } from '../conf.service';

import GithubReleases from './githubReleases.type';
import GithubReleasesData from './data/data.type';
import GithubReleasesConfig from './config/config.type';

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
@Resolver(GithubReleases)
export default class GithubReleasesResolver {
  constructor(private readonly confService: ConfService, private readonly countService: DataCountService) {}

  @Query(() => GithubReleases, {
    name: 'githubReleases',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geGithubReleases(): Promise<GithubReleases> {
    return new GithubReleases();
  }

  @ResolveField(() => GithubReleasesData, {
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
    @Parent() parent: GithubReleases,
  ): Promise<GithubReleasesData> {
    const userConfig = this.confService.getUserConfig();

    const data = new GithubReleasesData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, userConfig.elasticsearch.dataIndices.githubReleases + '*');

    return data;
  }

  @ResolveField(() => GithubReleasesConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: GithubReleases): Promise<GithubReleasesConfig> {
    return new GithubReleasesConfig();
  }
}
