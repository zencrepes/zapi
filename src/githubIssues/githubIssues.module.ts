import { Module } from '@nestjs/common';
import GithubIssuesResolvers from './githubIssues.resolvers';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

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
    GithubIssuesResolvers,
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
export class GithubIssuesModule {}