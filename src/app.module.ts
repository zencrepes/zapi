import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliveModule } from './alive/alive.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [AliveModule, IssuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
