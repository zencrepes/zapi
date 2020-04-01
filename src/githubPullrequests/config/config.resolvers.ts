import { Field, ObjectType, ID, Int } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Config from './config.type';
import getAvailableAggregations from './aggregations/aggregations.service';
import AggregationConnection from './aggregations/aggregationConnection.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Config)
export default class ConfigResolver {
  @ResolveProperty(() => AggregationConnection, {
    name: 'aggregations',
    description: 'Returns a paginated list of available aggregations',
  })
  public async getAggregations(
    @Parent()
    parent: Config,
  ) {
    const data = getAvailableAggregations();
    return data;
  }
}
