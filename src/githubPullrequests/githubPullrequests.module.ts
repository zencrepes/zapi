import { Module } from '@nestjs/common';
import GithubPullrequestsResolvers from './githubPullrequests.resolvers';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import ConfigResolver from './config/config.resolvers';
import DataResolver from './data/data.resolvers';
import ConfigAggregationsService from './config/aggregations/aggregations.service';
import DataAggregationsService from './data/aggregations/aggregations.service';
import DataItemsService from './data/items/items.service';
import DataMetricsService from './data/metrics/metrics.service';
import DataActivityService from './data/activity/activity.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfModule],
      useFactory: async (configService: ConfService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfService],
    }),
  ],
  providers: [
    GithubPullrequestsResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    DataAggregationsService,
    DataItemsService,
    DataMetricsService,
    DataActivityService,
  ],
})
export class GithubPullrequestsModule {}
