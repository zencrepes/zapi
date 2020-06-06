import { Module } from '@nestjs/common';
import { EsClientService } from './esClient.service';
import { ConfModule } from './conf.module';

@Module({
  imports: [ConfModule.register()],
  providers: [EsClientService],
  exports: [EsClientService],
})
export class EsClientModule {}
