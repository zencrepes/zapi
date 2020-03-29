import { Module } from '@nestjs/common';
import DataResolver from './data.resolvers';

@Module({
  providers: [DataResolver],
})
export default class DataModule {}
