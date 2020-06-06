import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfModule } from './conf.module';
import { EsClientModule } from './esClient.module';

import { ConfigModule } from './config/config.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
import { GithubVulnerabilitiesModule } from './githubVulnerabilities/githubVulnerabilities.module';
import { GithubRepositoriesModule } from './githubRepositories/githubRepositories.module';
import { GithubWatchersModule } from './githubWatchers/githubWatchers.module';
import { GithubLabelsModule } from './githubLabels/githubLabels.module';
import { GithubMilestonesModule } from './githubMilestones/githubMilestones.module';
import { GithubProjectsModule } from './githubProjects/githubProjects.module';
import { GithubReleasesModule } from './githubReleases/githubReleases.module';
import { GithubIssuesModule } from './githubIssues/githubIssues.module';
import { JiraIssuesModule } from './jiraIssues/jiraIssues.module';
import { CircleciEnvvarsModule } from './circleciEnvvars/circleciEnvvars.module';
import { CircleciPipelinesModule } from './circleciPipelines/circleciPipelines.module';
import { CircleciInsightsModule } from './circleciInsights/circleciInsights.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        debug: true,
        playground: true,

        context: ({ req }) => ({ req }),
      }),
    }),
    ConfModule.register(),
    EsClientModule,

    ConfigModule,
    GithubPullrequestsModule,
    GithubVulnerabilitiesModule,
    GithubRepositoriesModule,
    GithubWatchersModule,
    GithubLabelsModule,
    GithubMilestonesModule,
    GithubProjectsModule,
    GithubReleasesModule,
    GithubIssuesModule,
    JiraIssuesModule,
    CircleciEnvvarsModule,
    CircleciPipelinesModule,
    CircleciInsightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// test
