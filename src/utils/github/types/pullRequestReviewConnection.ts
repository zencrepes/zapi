import { Field, ObjectType, Int } from '@nestjs/graphql';

import PullRequestReviewEdge from './pullRequestReviewEdge';

@ObjectType()
export default class PullRequestReviewConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [PullRequestReviewEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: PullRequestReviewEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
