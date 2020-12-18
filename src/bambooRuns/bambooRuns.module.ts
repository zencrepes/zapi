import { Module } from '@nestjs/common';
import { ConfModule } from '../conf.module';
import { EsClientModule } from '../esClient.module';

import BambooRunsResolvers from './bambooRuns.resolvers';

import ConfigResolver from './config/config.resolvers';
import ConfigAggregationsService from '../utils/config/aggregations/aggregations.service';
import ConfigTableService from '../utils/config/table/table.service';
import DataResolver from './data/data.resolvers';
import DataAggregationsService from '../utils/data/aggregations/aggregations.service';
import DataItemsService from '../utils/data/items/items.service';
import DataCountService from '../utils/data/count/count.service';

@Module({
  imports: [ConfModule.register(), EsClientModule],
  providers: [
    BambooRunsResolvers,
    ConfigResolver,
    DataResolver,
    ConfigAggregationsService,
    ConfigTableService,
    DataAggregationsService,
    DataItemsService,
    DataCountService,
  ],
})
export class BambooRunsModule {}
