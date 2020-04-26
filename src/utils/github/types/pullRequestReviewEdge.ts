import { Field, ObjectType } from '@nestjs/graphql';

import PullRequestReview from './pullRequestReview';

@ObjectType()
export default class PullRequestReviewEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => PullRequestReview, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: PullRequestReview;
}
