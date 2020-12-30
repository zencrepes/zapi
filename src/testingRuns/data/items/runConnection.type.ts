import { Field, ObjectType, Int } from '@nestjs/graphql';

import TestingRun from '../../../utils/testing/types/run';

@ObjectType()
export default class TestingRunsConnection {
  @Field(() => [TestingRun], { nullable: true })
  nodes: TestingRun[];

  @Field(() => Int)
  totalCount: number;
}
