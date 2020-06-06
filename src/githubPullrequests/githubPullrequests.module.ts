import { Module } from '@nestjs/common';
import { ConfModule } from '../conf.module';
import { EsClientModule } from '../esClient.module';

import GithubPullrequestsResolvers from './githubPullrequests.resolvers';

import ConfigResolver from './config/config.resolvers';
import DataResolver from './data/data.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import ConfigTableService from '../utils/config/table/table.service';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
import DataMetricsService from './data/metrics/metrics.service';
import DataActivityService from './data/activity/activity.service';
import DataCountService from '../utils/data/count/count.service';

@Module({
  imports: [ConfModule.register(), EsClientModule],
  providers: [
    GithubPullrequestsResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    ConfigTableService,
    DataAggregationsService,
    DataItemsService,
    DataMetricsService,
    DataActivityService,
    DataCountService,
  ],
})
export class GithubPullrequestsModule {}
