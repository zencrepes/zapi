import { Module } from '@nestjs/common';
import ConfigResolver from './config.resolvers';

@Module({
  providers: [ConfigResolver],
})
export default class ConfigModule {}
