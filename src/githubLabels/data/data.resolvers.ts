import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import Label from '../../utils/github/types/label';
import DataLabelConnection from './items/labelConnection.type';
import ItemSortorder from './items/itemSortorder.type';
import DataItemsService from '../../utils/data/items/items.service';

import LabelsAggregationConnection from './aggregations/labelsAggregationConnection.type';
import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
  ) {}

  @ResolveField(() => DataLabelConnection, {
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
      userConfig.elasticsearch.dataIndices.githubLabels + '*',
    );
    return data;
  }

  @ResolveField(() => Label, {
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
  ): Promise<Label> {
    const userConfig = this.confService.getUserConfig();
    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.githubLabels);
    return item;
  }

  @ResolveField(() => LabelsAggregationConnection, {
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
      userConfig.elasticsearch.dataIndices.githubLabels + '*',
    );
    return data;
  }
}
