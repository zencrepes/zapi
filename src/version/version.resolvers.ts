import { Query, Resolver } from '@nestjs/graphql';
import { ConfService } from '../conf.service';

import Version from './version.type';

// https://github.com/nestjs/graphql/issues/475
@Resolver(Version)
export default class VersionResolvers {
  constructor(private readonly confService: ConfService) {}

  @Query(() => String, {
    name: 'version',
    description: 'Fetches the currently running API version',
  })
  public async getVersion(): Promise<String> {
    const appVersion = this.confService.get('APP_VERSION');
    return appVersion;
  }
}
