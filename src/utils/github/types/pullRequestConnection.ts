import { Field, ObjectType, Int } from '@nestjs/graphql';

import PullRequestEdge from './pullRequestEdge';

@ObjectType()
export default class PullRequestConnection {
  @Field(() => [PullRequestEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: PullRequestEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
