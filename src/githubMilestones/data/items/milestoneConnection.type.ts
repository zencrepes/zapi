import { Field, ObjectType, Int } from '@nestjs/graphql';

import Milestone from '../../../utils/github/types/milestone';

@ObjectType()
export default class DataMilestoneConnection {
  @Field(() => [Milestone], { nullable: true })
  nodes: Milestone[];

  @Field(() => Int)
  totalCount: number;
}
