import { Module, Global } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { GithubPullrequestsModule } from './githubPullrequests/githubPullrequests.module';
import { join } from 'path';
import { ConfModule } from './conf.module';
import { ConfService } from './conf.service';

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
    ConfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// test
