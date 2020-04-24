import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import Actor from './actor';

@ObjectType()
export default class PullRequestReview {
  @Field(type => Actor, {
    nullable: false,
    description: 'The actor.',
  })
  author: Actor;

  @Field(type => String, {
    nullable: false,
    description: 'The review state',
  })
  state: string;
}
