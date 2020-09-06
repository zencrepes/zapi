import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import CircleciJobRun from '../../utils/circleci/types/jobRun';
import CircleciInsightsItemConnection from './items/circleciInsightsItemConnection.type';
import CircleciInsightsSortorder from './items/itemSortorder.type';
import CirclecInsightsMatrixAggregationsConnection from './matrixAggregations/circleciInsightsMatrixAggregationConnection.type';

import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';

import DataItemsService from '../../utils/data/items/items.service';
import { addFilterToQuery, createTermFilter } from '../../utils/query';

import CircleciInsightsAggregationConnection from './aggregations/circleciInsightsAggregationConnection.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
  ) {}

  @ResolveField(() => CircleciInsightsItemConnection, {
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
      type: () => CircleciInsightsSortorder,
      nullable: true,
    })
    orderBy: CircleciInsightsSortorder,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();
    const data = await this.itemsService.findAll(
      first,
      size,
      parent.query,
      orderBy,
      userConfig.elasticsearch.dataIndices.circleciInsights + '*',
    );
    return data;
  }

  @ResolveField(() => CircleciJobRun, {
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
  ): Promise<CircleciJobRun> {
    const userConfig = this.confService.getUserConfig();
    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.circleciInsights);
    return item;
  }

  @ResolveField(() => CircleciInsightsAggregationConnection, {
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
    aggOptions: string,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();
    const data = await this.aggregationsService.findAll(
      field,
      parent.query,
      aggType,
      aggOptions,
      userConfig.elasticsearch.dataIndices.circleciInsights + '*',
    );
    return data;
  }

  @ResolveField(() => CirclecInsightsMatrixAggregationsConnection, {
    name: 'matrixAggregations',
    description:
      'Compare multiple metrics for multiple aggregations (for example, credits spent per week and per job name)',
  })
  public async getCompareAggregationsProperty(
    @Args({
      name: 'field',
      type: () => String,
      description: 'Field to aggregate on',
      nullable: false,
    })
    field: string,
    @Args({
      name: 'compareField',
      type: () => String,
      description: 'Field to be used for the comparison',
      nullable: false,
    })
    compareField: string,
    @Args({
      name: 'maxBuckets',
      type: () => String,
      description: 'Maximum number of buckets to analyze',
      nullable: true,
    })
    maxBuckets: string,
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
    aggOptions: string,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();

    const compareFields = await this.aggregationsService.findAll(
      compareField,
      parent.query,
      'term',
      JSON.stringify({ disjoint: false }),
      userConfig.elasticsearch.dataIndices.circleciInsights + '*',
    );
    const analyzedBuckets = [];
    for (const fieldBuckets of compareFields.buckets.slice(0, maxBuckets !== undefined ? maxBuckets : 10)) {
      const sourceQuery = JSON.parse(parent.query);
      const filter = createTermFilter('=', compareField, fieldBuckets.key);
      const updatedQuery = JSON.stringify(addFilterToQuery(filter, sourceQuery));
      const data = await this.aggregationsService.findAll(
        field,
        updatedQuery,
        aggType,
        aggOptions,
        userConfig.elasticsearch.dataIndices.circleciInsights + '*',
      );
      analyzedBuckets.push({ ...data, compareField: compareField, compareValue: fieldBuckets.key });
    }

    return { nodes: analyzedBuckets, compareField: compareField, totalCount: analyzedBuckets.length };
  }
}
