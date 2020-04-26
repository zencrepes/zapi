import { Field, ObjectType } from '@nestjs/graphql';

import Actor from './actor';

@ObjectType()
export default class PullRequestReview {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Actor, {
    nullable: false,
    description: 'The actor.',
  })
  author: Actor;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The review state',
  })
  state: string;
}
