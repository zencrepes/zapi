import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Type } from '../graphql.schema';
import { TypesGuard } from './types.guard';
import { TypesService } from './types.service';

@Resolver('Type')
export class TypesResolvers {
  constructor(private readonly typesService: TypesService) {}

  @Query('types')
  @UseGuards(TypesGuard)
  async getTypes() {
    return await this.typesService.findAll();
  }

  @Query('type')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<Type> {
    return this.typesService.findOneById(id);
  }
}
