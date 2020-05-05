import { Field, ObjectType, Int } from '@nestjs/graphql';

import MilestoneEdge from './milestoneEdge';

@ObjectType()
export default class MilestoneConnection {
  @Field(() => [MilestoneEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: MilestoneEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
