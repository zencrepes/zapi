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
import { JiraIssuesModule } from './jiraIssues/jiraIssues.module';
import { CircleciEnvvarsModule } from './circleciEnvvars/circleciEnvvars.module';
import { CircleciPipelinesModule } from './circleciPipelines/circleciPipelines.module';
import { CircleciInsightsModule } from './circleciInsights/circleciInsights.module';
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
    JiraIssuesModule,
    CircleciEnvvarsModule,
    CircleciPipelinesModule,
    CircleciInsightsModule,
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
