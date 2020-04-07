import { Module } from '@nestjs/common';
import ConfigResolvers from './config.resolvers';
import DatasetsResolvers from './datasets/datasets.resolvers';
import DatasetsService from './datasets/datasets.service';

import { ConfModule } from '../conf.module';
import { ConfService } from '../conf.service';

import { ElasticsearchModule } from '@nestjs/elasticsearch';

//https://stackoverflow.com/questions/58383939/nest-cant-resolve-dependencies-of-the-searchservice-please-make-sure-that
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
  providers: [ConfigResolvers, DatasetsResolvers, DatasetsService],
})
export class ConfigModule {}
