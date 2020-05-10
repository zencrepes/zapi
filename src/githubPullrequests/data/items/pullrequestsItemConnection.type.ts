import { Field, ObjectType, Int } from '@nestjs/graphql';

import PullRequest from '../../../utils/github/types/pullRequest';

@ObjectType()
export default class PullrequestsItemConnection {
  @Field(() => [PullRequest], { nullable: true })
  nodes: PullRequest[];

  @Field(() => Int)
  totalCount: number;
}
