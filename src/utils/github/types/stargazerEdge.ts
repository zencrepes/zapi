import { Field, ObjectType } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class StargazerEdge {
  @Field(() => User, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: User;
}
