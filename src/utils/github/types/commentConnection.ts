import { Field, ObjectType, Int } from '@nestjs/graphql';

import CommentEdge from './commentEdge';

@ObjectType()
export default class CommentConnection {
  @Field(() => [CommentEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: CommentEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
