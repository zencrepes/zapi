import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import PullRequestReview from './pullRequestReview';

@ObjectType()
export default class PullRequestReviewEdge {
  @Field(type => PullRequestReview, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: PullRequestReview;
}
