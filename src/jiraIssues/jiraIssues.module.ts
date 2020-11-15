import { Module } from '@nestjs/common';
import { ConfModule } from '../conf.module';
import { EsClientModule } from '../esClient.module';

import JiraIssuesResolvers from './jiraIssues.resolvers';

import ConfigResolver from './config/config.resolvers';
import DataResolver from './data/data.resolvers';
import JiraDataMatrixService from './data/matrix/matrix.service';

import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import ConfigTableService from '../utils/config/table/table.service';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
import DataCountService from '../utils/data/count/count.service';

@Module({
  imports: [ConfModule.register(), EsClientModule],
  providers: [
    JiraIssuesResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    ConfigTableService,
    DataAggregationsService,
    DataItemsService,
    JiraDataMatrixService,
    DataCountService,
  ],
})
export class JiraIssuesModule {}
