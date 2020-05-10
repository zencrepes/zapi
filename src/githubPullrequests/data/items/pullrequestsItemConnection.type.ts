import { Field, ObjectType, Int } from '@nestjs/graphql';

import PullRequest from '../../../utils/github/types/pullrequest';

@ObjectType()
export default class PullrequestsItemConnection {
  @Field(() => [PullRequest], { nullable: true })
  nodes: PullRequest[];

  @Field(() => Int)
  totalCount: number;
}
