import { Field, ObjectType, ID } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Config from './config';
import DatasetsService from './datasets/datasets.service';
import Dataset from './datasets/dataset.type';
import DatasetConnection from './datasets/datasetConnection.type';

// https://github.com/nestjs/graphql/issues/475
@Resolver(Config)
export default class ConfigResolvers {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Query(() => Config, {
    name: 'config',
    description: 'Fetch data useful for UI configuration',
  })
  public async getConfig(): Promise<Config> {
    return new Config();
  }

  @ResolveProperty(() => DatasetConnection, {
    name: 'datasets',
    description:
      'Collection of supported types of dataset, for example github issues, jira projects, etc...',
  })
  public async getDatasets(
    @Parent()
    parent: Config,
  ) {
    return await this.datasetsService.findAll();
  }

  @ResolveProperty(() => Dataset, {
    name: 'dataset',
    description: 'A single dataset element',
  })
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<Dataset> {
    return this.datasetsService.findOneById(id);
  }
}
