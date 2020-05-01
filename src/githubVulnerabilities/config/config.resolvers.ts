import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import Config from './config.type';
import ConfigAggregationsService from '../../utils/config/aggregations/aggregations.service';
import ConfigAggregations from '../../utils/config/aggregations/aggregations.type';

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
    const data = this.aggregationsService.findAll('githubVulnerabilities');
    return data;
  }
}
