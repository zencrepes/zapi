import { Field, ObjectType } from '@nestjs/graphql';

import Comment from './comment';

@ObjectType()
export default class CommentEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Comment, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Comment;
}
