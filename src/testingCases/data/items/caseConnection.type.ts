import { Field, ObjectType, Int } from '@nestjs/graphql';

import TestingCase from '../../../utils/testing/types/case';

@ObjectType()
export default class TestingCasesConnection {
  @Field(() => [TestingCase], { nullable: true })
  nodes: TestingCase[];

  @Field(() => Int)
  totalCount: number;
}
