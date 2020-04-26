import { Field, ObjectType, Int } from '@nestjs/graphql';

import CommentEdge from './commentEdge';

@ObjectType()
export default class CommentConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [CommentEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: CommentEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
