import { Field, ObjectType } from '@nestjs/graphql';

import PerfRun from './perfRun';

@ObjectType()
export default class PerfRunEdge {
  @Field(() => PerfRun, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: PerfRun;
}
