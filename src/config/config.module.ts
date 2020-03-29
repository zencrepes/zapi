import { Module } from '@nestjs/common';
import ConfigResolvers from './config.resolvers';
import DatasetsService from './datasets/datasets.service';

@Module({
  providers: [ConfigResolvers, DatasetsService],
})
export class ConfigModule {}
