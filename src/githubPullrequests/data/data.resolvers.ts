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
import DataItemsService from './items/items.service';
import DataAggregations from './aggregations/aggregations.type';
import DataAggregationsService from './aggregations/aggregations.service';
import DataMetrics from './metrics/metrics.type';
import DataMetricsService from './metrics/metrics.service';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
    private readonly metricsService: DataMetricsService,
  ) {}

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
    const data = await this.itemsService.findAll(
      first,
      size,
      parent.query,
      orderBy,
    );
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
    const item = await this.itemsService.findOneById(id);
    return item;
  }

  @ResolveProperty(() => DataAggregations, {
    name: 'aggregations',
    description: 'Return aggregations (facets)',
  })
  public async getAggregationsProperty(
    @Args({
      name: 'field',
      type: () => String,
      description:
        'Field to aggregate on, using the node as the root object (examples: states, author.login)',
      nullable: false,
    })
    field: string,
    @Parent()
    parent: Data,
  ) {
    const data = await this.aggregationsService.findAll(field, parent.query);
    return data;
  }

  @ResolveProperty(() => DataMetrics, {
    name: 'metrics',
    description: 'Return aggregations (facets)',
  })
  public async getMetricsProperty(
    @Args({
      name: 'field',
      type: () => String,
      description:
        'Numberic field to filter on, using the node as the root object (examples: labels.totalCount, comments.totalCount)',
      nullable: false,
    })
    field: string,
    @Parent()
    parent: Data,
  ) {
    const data = await this.metricsService.getMetrics(field, parent.query);
    return { ...data, field };
  }
}
