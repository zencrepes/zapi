import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import JiraIssue from '../../utils/jira/types/issue';
import JiraIssuesItemConnection from './items/jiraIssuesItemConnection.type';
import JiraIssuesSortorder from './items/itemSortorder.type';

import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';
import DataItemsService from '../../utils/data/items/items.service';
import JiraDataMatrix from './matrix/matrix.type';
import JiraDataMatrixService from './matrix/matrix.service';

import JiraIssuesAggregationConnection from './aggregations/jiraIssuesAggregationConnection.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
    private readonly matrixService: JiraDataMatrixService,
  ) {}

  @ResolveField(() => JiraIssuesItemConnection, {
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
      type: () => JiraIssuesSortorder,
      nullable: true,
    })
    orderBy: JiraIssuesSortorder,
    @Parent()
    parent: Data,
  ) {
    const userConfig = this.confService.getUserConfig();

    const data = await this.itemsService.findAll(
      first,
      size,
      parent.query,
      orderBy,
      userConfig.elasticsearch.dataIndices.jiraIssues + '*',
    );
    return data;
  }

  @ResolveField(() => JiraIssue, {
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
  ): Promise<JiraIssue> {
    const userConfig = this.confService.getUserConfig();

    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.jiraIssues);
    return item;
  }

  @ResolveField(() => JiraIssuesAggregationConnection, {
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
      userConfig.elasticsearch.dataIndices.jiraIssues + '*',
    );
    return data;
  }

  @ResolveField(() => JiraDataMatrix, {
    name: 'matrix',
    description: 'Return a matrix aggregation per week and field',
  })
  public async getSomeFucntion(
    @Args({
      name: 'dateField',
      type: () => String,
      description: 'Date field to be used for the aggregation (for example: ClosedAt)',
      nullable: false,
    })
    dateField: string,
    @Args({
      name: 'field',
      type: () => String,
      description: 'Field to be used for the aggregations (for example: repository.name)',
      nullable: false,
    })
    field: string,
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
    const data = await this.matrixService.getMatrix(dateField, field, parent.query, aggOptions);
    return { ...data, field };
  }  
}
