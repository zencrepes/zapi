import { Field, ObjectType } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class ReviewRequest {
  @Field(() => User, {
    nullable: true,
    description: 'The actor.',
  })
  requestedReviewer: User;
}
