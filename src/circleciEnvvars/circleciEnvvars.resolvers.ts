import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import CircleciEnvvars from './circleciEnvvars.type';
import CircleciEnvvarsData from './data/data.type';
import CircleciEnvvarsConfig from './config/config.type';

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
@Resolver(CircleciEnvvars)
export default class CircleciEnvvarsResolver {
  constructor(private readonly countService: DataCountService) {}
  @Query(() => CircleciEnvvars, {
    name: 'circleciEnvvars',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geCircleciEnvvars(): Promise<CircleciEnvvars> {
    return new CircleciEnvvars();
  }

  @ResolveField(() => CircleciEnvvarsData, {
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
    @Parent() parent: CircleciEnvvars,
  ): Promise<CircleciEnvvarsData> {
    const data = new CircleciEnvvarsData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, 'cci_envvars_');
    return data;
  }

  @ResolveField(() => CircleciEnvvarsConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: CircleciEnvvars): Promise<CircleciEnvvarsConfig> {
    return new CircleciEnvvarsConfig();
  }
}