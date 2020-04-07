import { Module, Global } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliveModule } from './alive/alive.module';
import { ConfigModule } from './config/config.module';
import { IssuesModule } from './issues/issues.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
import { join } from 'path';
import { ConfModule } from './conf.module';
import { ConfService } from './conf.service';

//import { EsModule } from './es.module';
import { ElasticsearchConfigService } from './es.module';

// class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
//   createElasticsearchOptions(): ElasticsearchModuleOptions {
//     return {
//       node: 'http://localhost:9200',
//     };
//   }
// }

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
    // ElasticsearchModule.registerAsync({
    //   imports: [ConfModule],
    //   useFactory: async (confService: ConfService) => ({
    //     node: confService.get('ELASTICSEARCH_NODE'),
    //   }),
    //   inject: [ConfService],
    // }),
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
    ConfModule,
    //    EsModule,
    // ElasticsearchService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// test
