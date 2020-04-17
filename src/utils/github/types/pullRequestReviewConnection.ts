import { Field, ObjectType, ID, Int } from 'type-graphql';

import PullRequestReviewEdge from './pullRequestReviewEdge';

@ObjectType()
export default class PullRequestReviewConnection {
  @Field(type => [PullRequestReviewEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: PullRequestReviewEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
