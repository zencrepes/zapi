import { Module } from '@nestjs/common';
import { TypesResolvers } from './types.resolvers';
import { TypesService } from './types.service';

@Module({
  providers: [TypesService, TypesResolvers],
})
export class TypesModule {}
