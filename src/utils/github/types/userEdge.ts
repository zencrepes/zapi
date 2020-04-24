import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class UserEdge {
  @Field(type => User, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: User;
}
