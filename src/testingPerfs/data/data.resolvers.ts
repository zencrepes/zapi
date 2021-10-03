import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import Perf from '../../utils/testing/types/perf';
import DataPerfConnection from './items/perfConnection.type';
import ItemSortorder from './items/itemSortorder.type';
import DataItemsService from '../../utils/data/items/items.service';

import PerfsAggregationConnection from './aggregations/perfsAggregationConnection.type';
import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataPerfResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
  ) {}

  @ResolveField(() => DataPerfConnection, {
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
      name: 'transaction',
      type: () => String,
      description: 'Transaction to return within runs',
      nullable: true,
    })
    transaction: string,     
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

    const filterTransaction = transaction === null ? "Total" : transaction
    const data = await this.itemsService.findAll(
      first,
      size,
      parent.query,
      orderBy,
      userConfig.elasticsearch.dataIndices.testingPerfs + '*',
    );
    console.log(data)

    // This could probably be done way better since here we're fetching everything from Elasticsearch
    const filteredNodes = data.nodes.map((d) => {
      return {
        ...d,
        runs: {
          ...d.runs,
          edges: d.runs.edges.map((r) => {
            return {
              node: {
                ...r.node,
                statistics: r.node.statistics.filter((s) => s.transaction === filterTransaction)
              }
            }
          })
        }
      }
    })

    return {
      ...data,
      nodes: filteredNodes,
    };
  }

  @ResolveField(() => Perf, {
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
  ): Promise<Perf> {
    const userConfig = this.confService.getUserConfig();
    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.testingPerfs);
    return item;
  }

  @ResolveField(() => PerfsAggregationConnection, {
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
      userConfig.elasticsearch.dataIndices.testingPerfs + '*',
    );
    return data;
  }
}