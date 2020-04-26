import { Field, ObjectType } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class UserEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => User, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: User;
}
