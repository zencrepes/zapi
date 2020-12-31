import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { buildQuery } from '@arranger/middleware';
import { ConfService } from '../conf.service';

import TestingRuns from './testingRuns.type';
import TestingRunsData from './data/data.type';
import TestingRunsConfig from './config/config.type';

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
@Resolver(TestingRuns)
export default class TestingRunsResolver {
  constructor(private readonly confService: ConfService, private readonly countService: DataCountService) {}

  @Query(() => TestingRuns, {
    name: 'testingRuns',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geTestingRuns(): Promise<TestingRuns> {
    return new TestingRuns();
  }

  @ResolveField(() => TestingRunsData, {
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
    @Parent() parent: TestingRuns,
  ): Promise<TestingRunsData> {
    const userConfig = this.confService.getUserConfig();

    const data = new TestingRunsData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, userConfig.elasticsearch.dataIndices.testingRuns + '*');

    return data;
  }

  @ResolveField(() => TestingRunsConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: TestingRuns): Promise<TestingRunsConfig> {
    return new TestingRunsConfig();
  }
}
