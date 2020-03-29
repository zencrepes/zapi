import { Module } from '@nestjs/common';
import GithubPullrequestsResolvers from './githubPullrequests.resolvers';

import DataModule from './data/data.module';

@Module({
  providers: [GithubPullrequestsResolvers],
  imports: [DataModule],
})
export class GithubPullrequestsModule {}
