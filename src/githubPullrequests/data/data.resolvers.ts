import { Field, ObjectType, ID, Int } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Data from './data.type';
import Item from './items/item.type';
import PullRequest from '../../utils/github/types/pullrequest';
import ItemConnection from './items/items.pagination';
import ItemOrder from './items/item.order';
import fetchItems from './items/fetchItems';
import Aggregations from './aggregations/aggregations.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  @ResolveProperty(() => ItemConnection, {
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
      type: () => ItemOrder,
      nullable: true,
    })
    orderBy: ItemOrder,
    @Parent()
    parent: Data,
  ) {
    const data = fetchItems(first, size, parent.query, orderBy);
    return data;
  }

  @ResolveProperty(() => PullRequest, {
    name: 'item',
    description: 'Returns a single item by providing its ID',
  })
  public async getItem(
    @Args({
      name: 'id',
      type: () => String,
      description: 'Return items starting from',
      nullable: false,
    })
    id: string,
    @Parent() parent: Data,
  ): Promise<PullRequest> {
    const item = new PullRequest();
    item.id = 'One single item, provided: ' + id;
    return item;
  }

  @ResolveProperty(() => Aggregations, {
    name: 'aggregations',
    description: 'Return aggregations (facets)',
  })
  public async getAggregationsProperty(@Parent() parent: Data) {
    const aggregations = new Aggregations();
    aggregations.id = 'Aggregations ID';
    return aggregations;
  }
}
