import { Module } from '@nestjs/common';

import { ConfModule } from '../conf.module';
import { EsClientModule } from '../esClient.module';

import ConfigResolvers from './config.resolvers';
import DatasetsResolvers from './datasets/datasets.resolvers';
import DatasetsService from './datasets/datasets.service';

//https://stackoverflow.com/questions/58383939/nest-cant-resolve-dependencies-of-the-searchservice-please-make-sure-that
@Module({
  imports: [ConfModule.register(), EsClientModule],
  providers: [ConfigResolvers, DatasetsResolvers, DatasetsService],
})
export class ConfigModule {}
