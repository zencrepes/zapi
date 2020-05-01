import { Field, ObjectType, Int } from '@nestjs/graphql';

import Pullrequest from '../../../utils/github/types/pullrequest';

@ObjectType()
export default class PullrequestsItemConnection {
  @Field(() => [Pullrequest], { nullable: true })
  nodes: Pullrequest[];

  @Field(() => Int)
  totalCount: number;
}
