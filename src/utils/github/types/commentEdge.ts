import { Field, ObjectType, ID, Int } from 'type-graphql';

import Comment from './comment';

@ObjectType()
export default class CommentEdge {
  @Field(type => Comment, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Comment;
}
