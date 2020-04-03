import { Field, ObjectType, ID } from 'type-graphql';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import Config from './config.type';
import DatasetsConfig from './datasets/datasetsconfig.type';

// https://github.com/nestjs/graphql/issues/475
@Resolver(Config)
export default class ConfigResolvers {
  @Query(() => Config, {
    name: 'config',
    description: 'Fetch data useful for UI configuration',
  })
  public async getConfig(): Promise<Config> {
    return new Config();
  }

  @ResolveProperty(() => DatasetsConfig, {
    name: 'datasets',
    description:
      'Collection of supported types of dataset, for example github issues, jira projects, etc...',
  })
  public async getDatasetsConfig(
    @Parent() parent: Config,
  ): Promise<DatasetsConfig> {
    return new DatasetsConfig();
  }
}
