import { Module } from '@nestjs/common';
import GithubVulnerabilitiesResolvers from './githubVulnerabilities.resolvers';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import ConfigResolver from './config/config.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import DataResolver from './data/data.resolvers';
// import DataAggregationsService from './data/aggregations/aggregations.service';
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
    GithubVulnerabilitiesResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    // DataAggregationsService,
    DataItemsService,
    // DataMetricsService,
    // DataActivityService,
  ],
})
export class GithubVulnerabilitiesModule {}
