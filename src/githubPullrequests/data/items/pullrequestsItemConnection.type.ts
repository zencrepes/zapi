import { Field, ObjectType, Int } from '@nestjs/graphql';

import Pullrequest from '../../../utils/github/types/pullRequest';

@ObjectType()
export default class PullrequestsItemConnection {
  @Field(() => [Pullrequest], { nullable: true })
  nodes: Pullrequest[];

  @Field(() => Int)
  totalCount: number;
}
