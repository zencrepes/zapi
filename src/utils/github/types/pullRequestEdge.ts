import { Field, ObjectType } from '@nestjs/graphql';

import PullRequest from './pullRequest';

@ObjectType()
export default class PullrequestEdge {
  @Field(() => PullRequest, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: PullRequest;
}
