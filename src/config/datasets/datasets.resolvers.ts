import { Field, ObjectType, ID } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Config from '../config.type';
import Dataset from './dataset.type';
import Datasets from './datasets.type';
import { fetchItems, fetchItem } from './datasets.service';

// https://github.com/nestjs/graphql/issues/475
@Resolver(Config)
export default class DatasetsResolvers {
  @ResolveProperty(() => Datasets, {
    name: 'datasets',
    description:
      'Collection of supported types of dataset, for example github issues, jira projects, etc...',
  })
  public async getDatasets(
    @Parent()
    parent: Config,
  ) {
    return await fetchItems();
  }

  @ResolveProperty(() => Dataset, {
    name: 'dataset',
    description: 'A single dataset element',
  })
  public async getDataset(
    @Args('id')
    id: string,
    @Parent()
    parent: Config,
  ) {
    return fetchItem(id);
  }
}
