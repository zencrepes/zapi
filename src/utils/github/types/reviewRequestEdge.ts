import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import ReviewRequest from './reviewRequest';

@ObjectType()
export default class ReviewRequestEdge {
  @Field(type => ReviewRequest, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ReviewRequest;
}
