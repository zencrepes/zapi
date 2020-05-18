import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import Data from './data.type';
import CircleciEnvvar from '../../utils/jira/types/issue';
import CircleciEnvvarsItemConnection from './items/circleciEnvvarsItemConnection.type';
import CircleciEnvvarsSortorder from './items/itemSortorder.type';

import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';
import DataItemsService from '../../utils/data/items/items.service';

import CircleciEnvvarsAggregationConnection from './aggregations/circleciEnvvarsAggregationConnection.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
  ) {}

  @ResolveField(() => CircleciEnvvarsItemConnection, {
    name: 'items',
    description: 'Returns a paginated list of items',
  })
  public async getItemsProperty(
    @Args({
      name: 'from',
      type: () => Int,
      description: 'Return items starting from',
      nullable: true,
      defaultValue: 0,
    })
    first: number,
    @Args({
      name: 'size',
      type: () => Int,
      description: 'Number if items to return ',
      nullable: true,
      defaultValue: 10,
    })
    size: number,
    @Args({
      name: 'orderBy',
      type: () => CircleciEnvvarsSortorder,
      nullable: true,
    })
    orderBy: CircleciEnvvarsSortorder,
    @Parent()
    parent: Data,
  ) {
    const data = await this.itemsService.findAll(first, size, parent.query, orderBy, 'cci_envvars_');
    return data;
  }

  @ResolveField(() => CircleciEnvvar, {
    name: 'item',
    description: 'Returns a single item by providing its ID',
  })
  public async getItem(
    @Args({
      name: 'id',
      type: () => String,
      description: 'ID fo an item',
      nullable: false,
    })
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Parent() parent: Data,
  ): Promise<CircleciEnvvar> {
    const item = await this.itemsService.findOneById(id);
    return item;
  }

  @ResolveField(() => CircleciEnvvarsAggregationConnection, {
    name: 'aggregations',
    description: 'Return aggregations (facets)',
  })
  public async getAggregationsProperty(
    @Args({
      name: 'field',
      type: () => String,
      description: 'Field to aggregate on, using the node as the root object (examples: states, author.login)',
      nullable: false,
    })
    field: string,
    @Args({
      name: 'aggType',
      type: () => String,
      description: 'Type of aggregation (default: term)',
      nullable: true,
    })
    aggType: string,
    @Args({
      name: 'aggOptions',
      type: () => String,
      description: 'Additional options as a stringified object (more details in the documentation)',
      nullable: true,
    })
    options: string,
    @Parent()
    parent: Data,
  ) {
    const data = await this.aggregationsService.findAll(field, parent.query, aggType, options, 'cci_envvars_');
    return data;
  }
}
