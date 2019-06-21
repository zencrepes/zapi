import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AliveModule } from './alive/alive.module';

@Module({
  imports: [AliveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
