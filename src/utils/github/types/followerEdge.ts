import { Field, ObjectType } from '@nestjs/graphql';

import Follower from './follower';

@ObjectType()
export default class FollowerEdge {
  @Field(() => Follower, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Follower;
}
