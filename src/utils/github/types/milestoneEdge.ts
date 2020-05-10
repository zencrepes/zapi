import { Field, ObjectType } from '@nestjs/graphql';

import Milestone from './milestone';

@ObjectType()
export default class MilestoneEdge {
  @Field(() => Milestone, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Milestone;
}
