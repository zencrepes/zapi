import { Module } from '@nestjs/common';
import ConfigResolvers from './config.resolvers';
import DatasetsResolvers from './datasets/datasets.resolvers';

@Module({
  providers: [ConfigResolvers, DatasetsResolvers],
})
export class ConfigModule {}
