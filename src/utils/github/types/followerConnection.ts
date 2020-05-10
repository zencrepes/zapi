import { Field, ObjectType, Int } from '@nestjs/graphql';

import FollowerEdge from './followerEdge';

@ObjectType()
export default class FollowerConnection {
  @Field(() => [FollowerEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: FollowerEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
