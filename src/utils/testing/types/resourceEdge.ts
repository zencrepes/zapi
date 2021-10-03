import { Field, ObjectType } from '@nestjs/graphql';

import Resource from './resource';

@ObjectType()
export default class ResourceEdge {
  @Field(() => Resource, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Resource;
}
