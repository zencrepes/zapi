import { Field, ObjectType, Int } from '@nestjs/graphql';

import FollowingEdge from './followerEdge';

@ObjectType()
export default class FollowingConnection {
  @Field(() => [FollowingEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: FollowingEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
