import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
import { GithubVulnerabilitiesModule } from './githubVulnerabilities/githubVulnerabilities.module';
import { GithubRepositoriesModule } from './githubRepositories/githubRepositories.module';
import { GithubWatchersModule } from './githubWatchers/githubWatchers.module';
import { JiraIssuesModule } from './jiraIssues/jiraIssues.module';
import { CircleciEnvvarsModule } from './circleciEnvvars/circleciEnvvars.module';
import { CircleciPipelinesModule } from './circleciPipelines/circleciPipelines.module';
import { join } from 'path';
import { ConfModule } from './conf.module';

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
    ConfigModule,
    GithubPullrequestsModule,
    GithubVulnerabilitiesModule,
    GithubRepositoriesModule,
    GithubWatchersModule,
    JiraIssuesModule,
    CircleciEnvvarsModule,
    CircleciPipelinesModule,
    ConfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// test
