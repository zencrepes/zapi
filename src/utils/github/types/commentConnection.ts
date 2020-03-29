import { Field, ObjectType, ID, Int } from 'type-graphql';

import CommentEdge from './commentEdge';

@ObjectType()
export default class CommentConnection {
  @Field(type => [CommentEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: CommentEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
