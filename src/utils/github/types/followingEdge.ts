import { Field, ObjectType, Int } from '@nestjs/graphql';

import Following from './following';

@ObjectType()
export default class FollowingConnection {
  @Field(() => [Following], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: Following[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
