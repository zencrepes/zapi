import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfModule } from './conf.module';
import { ConfService } from './conf.service';
import { EsClientModule } from './esClient.module';

import { ConfigModule } from './config/config.module';
import { VersionModule } from './version/version.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
import { GithubVulnerabilitiesModule } from './githubVulnerabilities/githubVulnerabilities.module';
import { GithubRepositoriesModule } from './githubRepositories/githubRepositories.module';
import { GithubWatchersModule } from './githubWatchers/githubWatchers.module';
import { GithubLabelsModule } from './githubLabels/githubLabels.module';
import { GithubMilestonesModule } from './githubMilestones/githubMilestones.module';
import { GithubProjectsModule } from './githubProjects/githubProjects.module';
import { GithubReleasesModule } from './githubReleases/githubReleases.module';
import { GithubIssuesModule } from './githubIssues/githubIssues.module';
import { GithubMavenPomsModule } from './githubMavenPoms/githubMavenPoms.module';
import { JiraIssuesModule } from './jiraIssues/jiraIssues.module';
import { CircleciEnvvarsModule } from './circleciEnvvars/circleciEnvvars.module';
import { CircleciPipelinesModule } from './circleciPipelines/circleciPipelines.module';
import { CircleciInsightsModule } from './circleciInsights/circleciInsights.module';
import { TestingStatesModule } from './testingStates/testingStates.module';
import { TestingRunsModule } from './testingRuns/testingRuns.module';
import { TestingCasesModule } from './testingCases/testingCases.module';
import { TestingPerfsModule } from './testingPerfs/testingPerfs.module';
import { BambooRunsModule } from './bambooRuns/bambooRuns.module';
import { join } from 'path';

import { AuthenticationMiddleware } from './auth/authentication.middleware';

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
    VersionModule,
    GithubPullrequestsModule,
    GithubVulnerabilitiesModule,
    GithubRepositoriesModule,
    GithubWatchersModule,
    GithubLabelsModule,
    GithubMilestonesModule,
    GithubProjectsModule,
    GithubReleasesModule,
    GithubIssuesModule,
    GithubMavenPomsModule,
    JiraIssuesModule,
    CircleciEnvvarsModule,
    CircleciPipelinesModule,
    CircleciInsightsModule,
    TestingStatesModule,
    TestingRunsModule,
    TestingCasesModule,
    TestingPerfsModule,
    BambooRunsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule { }
export class AppModule {
  auth0Disabled: boolean;

  constructor(config: ConfService) {
    this.auth0Disabled = JSON.parse(config.get('KEYCLOAK_DISABLED')); // Trick to convert string to boolean
  }

  public configure(consumer: MiddlewareConsumer) {
    if (this.auth0Disabled !== true) {
      consumer.apply(AuthenticationMiddleware).forRoutes({ path: '/graphql', method: RequestMethod.POST });
    }
  }
}

// test
