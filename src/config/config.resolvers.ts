import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

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
}
