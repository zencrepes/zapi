import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliveModule } from './alive/alive.module';
import { ConfigModule } from './config/config.module';
import { IssuesModule } from './issues/issues.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
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
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.schema.ts'),
    //   },
    //   installSubscriptionHandlers: true,
    // }),
    AliveModule,
    ConfigModule,
    GithubPullrequestsModule,
    IssuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// test
