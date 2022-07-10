import { Field, ObjectType, Int } from '@nestjs/graphql';

import TagEdge from './tagEdge';

@ObjectType()
export default class TagConnection {
  @Field(() => [TagEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: TagEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
