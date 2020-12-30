import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import Run from '../../utils/testing/types/run';
import DataTestingRunConnection from './items/runConnection.type';
import ItemSortorder from './items/itemSortorder.type';
import DataItemsService from '../../utils/data/items/items.service';
import TestingRunsFailureRateConnection from './failurerate/failurerateConnection.type';
import DataFailureRateService from '../../utils/data/failurerate/failurerate.service';

import TestingRunsAggregationConnection from './aggregations/runsAggregationConnection.type';
import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
    private readonly failurerateService: DataFailureRateService,
  ) {}

  @ResolveField(() => DataTestingRunConnection, {
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
      type: () => ItemSortorder,
      nullable: true,
    })
    orderBy: ItemSortorder,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();

    const data = await this.itemsService.findAll(
      first,
      size,
      parent.query,
      orderBy,
      userConfig.elasticsearch.dataIndices.testingRuns + '*',
    );
    return data;
  }

  @ResolveField(() => Run, {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Parent() parent: Data,
  ): Promise<Run> {
    const userConfig = this.confService.getUserConfig();
    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.testingRuns);
    return item;
  }

  @ResolveField(() => TestingRunsAggregationConnection, {
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
    const userConfig = this.confService.getUserConfig();

    const data = await this.aggregationsService.findAll(
      field,
      parent.query,
      aggType,
      options,
      userConfig.elasticsearch.dataIndices.testingRuns + '*',
    );
    return data;
  }

  @ResolveField(() => TestingRunsFailureRateConnection, {
    name: 'failurerate',
    description: 'Return an aggregation by a provided timeframe (week, day, month) of the average failure rate',
  })
  public async getDataTestingRunFailureRate(
    @Args({
      name: 'interval',
      type: () => String,
      description: 'Specify the interval for the data histogram (day, week, month, year)',
      defaultValue: 'week',
      nullable: true,
    })
    dateInterval: string,
    @Args({
      name: 'field',
      type: () => String,
      description: 'Specify the field to aggregate by (such as plan.name.keyword)',
      defaultValue: 'name.keyword',
      nullable: false,
    })
    field: string,
    @Args({
      name: 'datefield',
      type: () => String,
      description: 'Specify the date field to aggregate on',
      defaultValue: 'createdAt',
      nullable: false,
    })
    datefield: string,
    @Args({
      name: 'buckets',
      type: () => Number,
      description: 'Specify the number of first level buckets to return',
      defaultValue: 25,
      nullable: false,
    })
    buckets: number,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();

    const data = await this.failurerateService.getFailure(
      userConfig.elasticsearch.dataIndices.testingRuns + '*',
      dateInterval,
      field,
      datefield,
      buckets,
      parent.query
    );
    return { ...data, field };
  }  
}
