import { Module } from '@nestjs/common';
import GithubLabelsResolvers from './githubLabels.resolvers';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import ConfigResolver from './config/config.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import ConfigTableService from '../utils/config/table/table.service';
import DataResolver from './data/data.resolvers';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
import DataCountService from '../utils/data/count/count.service';

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
    GithubLabelsResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    ConfigTableService,
    DataAggregationsService,
    DataItemsService,
    DataCountService,
    // DataMetricsService,
    // DataActivityService,
  ],
})
export class GithubLabelsModule {}
