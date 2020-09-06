import { Int } from '@nestjs/graphql';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ConfService } from '../../conf.service';

import Data from './data.type';
import Issue from '../../utils/github/types/issue';
import IssuesItemConnection from './items/issuesItemConnection.type';
import ItemSortorder from './items/itemSortorder.type';
import DataItemsService from '../../utils/data/items/items.service';

import IssuesAggregationConnection from './aggregations/issuesAggregationConnection.type';
import DataAggregationsService from '../../utils/data/aggregations/aggregations.service';
import DataMetrics from './metrics/metrics.type';
import DataMetricsService from './metrics/metrics.service';
import DataMilestones from './milestones/milestones.type';
import DataMilestonesService from './milestones/milestones.service';
import DataProjects from './projects/projects.type';
import DataProjectsService from './projects/projects.service';
import DataVelocity from './velocity/velocity.type';
import DataVelocityService from './velocity/velocity.service';
import DataMatrix from './matrix/matrix.type';
import DataMatrixService from './matrix/matrix.service';
import DataNetwork from './network/network.type';
import DataNetworkService from './network/network.service';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Data)
export default class DataResolver {
  constructor(
    private readonly confService: ConfService,
    private readonly aggregationsService: DataAggregationsService,
    private readonly itemsService: DataItemsService,
    private readonly metricsService: DataMetricsService,
    private readonly projectsService: DataProjectsService,
    private readonly milestonesService: DataMilestonesService,
    private readonly velocityService: DataVelocityService,
    private readonly matrixService: DataMatrixService,
    private readonly networkService: DataNetworkService,
  ) {}

  @ResolveField(() => IssuesItemConnection, {
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
      userConfig.elasticsearch.dataIndices.githubIssues + '*',
    );
    return data;
  }

  @ResolveField(() => Issue, {
    name: 'item',
    nullable: true,
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
  ): Promise<Issue> {
    const userConfig = this.confService.getUserConfig();

    const item = await this.itemsService.findOneById(id, userConfig.elasticsearch.dataIndices.githubIssues);
    return item;
  }

  @ResolveField(() => IssuesAggregationConnection, {
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
      userConfig.elasticsearch.dataIndices.githubIssues + '*',
    );
    return data;
  }

  @ResolveField(() => DataMetrics, {
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

  @ResolveField(() => DataProjects, {
    name: 'projects',
    description: 'Return a list of projects matching the query',
  })
  public async getProjectsProperty(
    @Parent()
    parent: Data,
  ) {
    const data = await this.projectsService.getProjects(parent.query);
    return { ...data };
  }

  @ResolveField(() => DataMilestones, {
    name: 'milestones',
    description: 'Return a list of milestones matching the query',
  })
  public async getMilestonesProperty(
    @Parent()
    parent: Data,
  ) {
    const data = await this.milestonesService.getMilestones(parent.query);
    return { ...data };
  }

  @ResolveField(() => DataVelocity, {
    name: 'velocity',
    description: 'Return velocity metrics',
  })
  public async getVelocityProperty(
    @Args({
      name: 'interval',
      type: () => String,
      description:
        'Interval to run the aggregation on (week, day, ...). See: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html',
      nullable: true,
      defaultValue: 'week',
    })
    interval: string,
    @Args({
      name: 'moving',
      type: () => Number,
      description: 'Number of elements to be used for calculating the moving average, default is 4',
      nullable: true,
      defaultValue: 4,
    })
    moving: number,
    @Args({
      name: 'window',
      type: () => Number,
      description: 'The dataset window to use for calculations',
      nullable: true,
      defaultValue: 53,
    })
    window: number,
    @Parent()
    parent: Data,
  ) {
    const data = await this.velocityService.getVelocity(interval, moving, window, parent.query);
    return { ...data };
  }

  @ResolveField(() => DataMatrix, {
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

  @ResolveField(() => DataNetwork, {
    name: 'network',
    description: 'Return the networked view from a starting set of nodes',
  })
  public async getNetworksProperty(
    @Args({
      name: 'rootNodes',
      type: () => [String],
      description: 'Root nodes to be used as starting point for the network graph',
      nullable: false,
    })
    rootNodes: string[],
    @Parent()
    parent: Data,
  ) {
    const data = await this.networkService.getNetwork(rootNodes, parent.query);
    return { ...data };
  }
}
