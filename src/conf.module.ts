import { Module, DynamicModule } from '@nestjs/common';
import { ConfService } from './conf.service';

@Module({})
export class ConfModule {
  static register(): DynamicModule {
    return {
      module: ConfModule,
      providers: [ConfService],
      exports: [ConfService],
    };
  }
}
