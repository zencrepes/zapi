import { Module } from '@nestjs/common';
import { ConfModule } from '../conf.module';
import { EsClientModule } from '../esClient.module';

import GithubIssuesResolvers from './githubIssues.resolvers';

import ConfigResolver from './config/config.resolvers';
import DataResolver from './data/data.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import ConfigTableService from '../utils/config/table/table.service';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
import DataMetricsService from './data/metrics/metrics.service';
import DataCountService from '../utils/data/count/count.service';
import DataMilestonesService from './data/milestones/milestones.service';
import DataProjectsService from './data/projects/projects.service';
import DataVelocityService from './data/velocity/velocity.service';
import DataMatrixService from './data/matrix/matrix.service';
import DataNetworkService from './data/network/network.service';

@Module({
  imports: [ConfModule.register(), EsClientModule],
  providers: [
    GithubIssuesResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    ConfigTableService,
    DataAggregationsService,
    DataItemsService,
    DataMetricsService,
    DataCountService,
    DataMilestonesService,
    DataProjectsService,
    DataVelocityService,
    DataMatrixService,
    DataNetworkService,
  ],
})
export class GithubIssuesModule {}
