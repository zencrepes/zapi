import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import Config from '../config.type';
import Dataset from './dataset.type';
import Datasets from './datasets.type';
import DatasetsService from './datasets.service';

// https://github.com/nestjs/graphql/issues/475
@Resolver(Config)
export default class DatasetsResolvers {
  constructor(private readonly datasetService: DatasetsService) {}

  @ResolveField(() => Datasets, {
    name: 'datasets',
    description: 'Collection of supported types of dataset, for example github issues, jira projects, etc...',
  })
  public async getDatasets(
    @Parent()
    parent: Config, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    return await this.datasetService.findAll();
  }

  @ResolveField(() => Dataset, {
    name: 'dataset',
    description: 'A single dataset element',
  })
  public async getDataset(
    @Args('id')
    id: string,
    @Parent()
    parent: Config, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    return this.datasetService.findOneById(id);
  }
}
