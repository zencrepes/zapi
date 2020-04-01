import { Module } from '@nestjs/common';
import GithubPullrequestsResolvers from './githubPullrequests.resolvers';

import DataModule from './data/data.module';
import ConfigModule from './config/config.module';

@Module({
  providers: [GithubPullrequestsResolvers],
  imports: [DataModule, ConfigModule],
})
export class GithubPullrequestsModule {}
