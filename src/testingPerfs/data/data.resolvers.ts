import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import Perf from '../../utils/testing/types/perf';
import PerfAverage from '../../utils/testing/types/perfAverage';
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
      defaultValue: 100,
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
    @Args({
      name: 'includeDisabled',
      type: () => Boolean,
      description: 'Should the respond include disabled (delete) documents?',
      nullable: true,
      defaultValue: false,
    })
    includeDisabled: boolean, 
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
      includeDisabled
    );

    // This should probably be done way better since here we're fetching everything from Elasticsearch
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
    nullable: true,
  })
  public async getItem(
    @Args({
      name: 'id',
      type: () => String,
      description: 'Return items starting from',
      nullable: false,
    })
    id: string,
    @Args({
      name: 'profileId',
      type: () => String,
      description: 'Return a single profile (a single run within a run)',
      nullable: true,
    })
    profileId: string,   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Parent() parent: Data,
  ): Promise<Perf> {
    const userConfig = this.confService.getUserConfig();
    if (id === '') {
      return null;
    }
    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.testingPerfs);
    if (profileId !== undefined && profileId !== null) {
      const selectedRun = item.runs.edges.find((r) => r.node.id === profileId)
      if (selectedRun !== undefined) {
        const updatedItem = {
          ...item,
          run: {
            ...selectedRun.node,
            id: `${id} - ${selectedRun.node.id}`,
          }
        }
        delete item.runs
        return updatedItem
      }
    }

    return {
      ...item,
      _source: JSON.stringify(item)
    };
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

  @ResolveField(() => PerfAverage, {
    name: 'average',
    description: 'Returns a paginated list of items',
    nullable: true,
  })
  public async getAverageProperty(
    @Args({
      name: 'profileId',
      type: () => String,
      description: 'Return a single profile (a single run within a run)',
      nullable: true,
    })
    profileId: string,
    @Args({
      name: 'averageQuery',
      type: () => String,
      description: 'Query to fetch documents to be used to calculate the averages',
      nullable: true,
    })
    averageQuery: string,    
    @Args({
      name: 'statsKeys',
      type: () => [String],
      description: 'Array of statistics keys to return',
      nullable: true,
      defaultValue: ['sampleCount', 'errorCount', 'errorPct', 'meanResTime', 'medianResTime', 'minResTime', 'maxResTime', 'pct1ResTime', 'pct2ResTime', 'pct3ResTime', 'throughput']
    })
    statsKeys: string,     
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();

    if (profileId === '') {
      return null;
    }

    // Get all records from the parent query, the records fetched using the other query MUST be part of that first array.
    // This is to make sure that if we run an average on on a particular image, 
    // we don't collect records corresponding to another type of run that might happen to be using the same image
    const dataParent = await this.itemsService.findAll(
      0,
      10000,
      parent.query,
      {direction: 'DESC', field: 'startedAt'},
      userConfig.elasticsearch.dataIndices.testingPerfs + '*',
    );

    const data = await this.itemsService.findAll(
      0,
      10000,
      averageQuery,
      {direction: 'DESC', field: 'startedAt'},
      userConfig.elasticsearch.dataIndices.testingPerfs + '*',
    );
    
    // Place the data in an array filtered on the profile ID
    const filteredData: any = []
    // Filtering out any document that might not be in the parent query.
    for (const item of data.nodes.filter((n) => dataParent.nodes.find((p) => p.id === n.id) !== undefined )) {      
      const selectedRun = item.runs.edges.filter((r) => r.node !== undefined).find((r) => r.node.name === profileId)
      if (selectedRun !== undefined) {
        filteredData.push({...item, statistics: selectedRun.node.statistics})
      }
    }

    if (filteredData.length === 0) {
      return null;
    }

    const transactions = filteredData[0].statistics.map((t) => t.transaction)

    const statsValues = []
    const statsComputed = []
    // Iterate over all available transactions
    for (const t of transactions) {
      for (const key of statsKeys) {
        const values = []
        for (const run of filteredData) {
          const currentValue = run.statistics.filter((st) => t === st.transaction)
          if (currentValue !== undefined) {
            values.push(currentValue[0][key])
            statsValues.push({
              id: run.id,
              name: run.name,
              startedAt: run.startedAt,
              value: currentValue[0][key],
              statisticsKey: key,
              transaction: t
            })            
          }
        }
        statsComputed.push({
          statisticsKey: key,
          transaction: t,
          value: values.reduce((acc, v) => acc + v, 0) / values.length
        })
      }
    }

    return {
      id: 'average',      
      runs: filteredData,
      statisticsKeys: statsKeys,
      transactions: transactions,
      average: statsComputed,
      values: statsValues
    }
  }

  @Mutation(() => Perf, {
    name: 'disableTestingsPerfsRuns',
    description: 'Prevent a testing perfs run from being included in the results',
  })
  async disableTestingsPerfsRuns(
    @Args({ name: 'id', type: () => String }) id: string, 
    @Args({ name: 'username', type: () => String, nullable: true, defaultValue: ''}) username: string
  ) {
    const userConfig = this.confService.getUserConfig();
    if (id === '') {
      return null;
    }
    await this.itemsService.disableDocument(id, userConfig.elasticsearch.dataIndices.testingPerfs, username);

    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.testingPerfs);
    return item;
  }

  @Mutation(() => Perf, {
    name: 'enableTestingsPerfsRuns',
    description: 'Prevent a testing perfs run from being included in the results',
  })
  async enableTestingsPerfsRuns(
    @Args({ name: 'id', type: () => String }) id: string, 
    @Args({ name: 'username', type: () => String, nullable: true, defaultValue: ''}) username: string    
  ) {
    const userConfig = this.confService.getUserConfig();
    if (id === '') {
      return null;
    }
    await this.itemsService.enableDocument(id, userConfig.elasticsearch.dataIndices.testingPerfs, username);

    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.testingPerfs);
    return item;
  }  
}
