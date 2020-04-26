import { Field, ObjectType } from '@nestjs/graphql';

import ReviewRequest from './reviewRequest';

@ObjectType()
export default class ReviewRequestEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ReviewRequest, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ReviewRequest;
}
