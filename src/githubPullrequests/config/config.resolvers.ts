import { Field, ObjectType, ID, Int } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Config from './config.type';
import ConfigAggregationsService from './aggregations/aggregations.service';
import ConfigAggregations from './aggregations/aggregations.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Config)
export default class ConfigResolver {
  constructor(
    private readonly aggregationsService: ConfigAggregationsService,
  ) {}

  @ResolveProperty(() => ConfigAggregations, {
    name: 'aggregations',
    description: 'Returns a paginated list of available aggregations',
  })
  public async getAggregations(
    @Parent()
    parent: Config,
  ) {
    const data = this.aggregationsService.findAll();
    return data;
  }
}
