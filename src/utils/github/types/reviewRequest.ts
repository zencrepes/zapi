import { Field, ObjectType, ID, Int } from 'type-graphql';

import User from './user';

@ObjectType()
export default class ReviewRequest {
  @Field(type => User, {
    nullable: false,
    description: 'The actor.',
  })
  requestedReviewer: User;
}
