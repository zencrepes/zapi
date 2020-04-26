import { Field, ObjectType } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class ReviewRequest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => User, {
    nullable: false,
    description: 'The actor.',
  })
  requestedReviewer: User;
}
