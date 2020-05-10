import { Module } from '@nestjs/common';
import GithubWatchersResolvers from './githubWatchers.resolvers';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import ConfigResolver from './config/config.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import DataResolver from './data/data.resolvers';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
// import DataMetricsService from './data/metrics/metrics.service';
// import DataActivityService from './data/activity/activity.service';

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
    GithubWatchersResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    DataAggregationsService,
    DataItemsService,
    // DataMetricsService,
    // DataActivityService,
  ],
})
export class GithubWatchersModule {}
