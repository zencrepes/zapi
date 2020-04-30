import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import Config from './config.type';
import ConfigAggregationsService from './aggregations/aggregations.service';
import ConfigAggregations from './aggregations/aggregations.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Config)
export default class ConfigResolver {
  constructor(private readonly aggregationsService: ConfigAggregationsService) {}

  @ResolveField(() => ConfigAggregations, {
    name: 'aggregations',
    description: 'Returns a paginated list of available aggregations',
  })
  public async getAggregations(
    @Parent()
    parent: Config, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const data = this.aggregationsService.findAll();
    return data;
  }
}
