import { Field, ObjectType, Int } from '@nestjs/graphql';

import Perf from '../../../utils/testing/types/perf';

@ObjectType()
export default class DataPerfConnection {
  @Field(() => [Perf], { nullable: true })
  nodes: Perf[];

  @Field(() => Int)
  totalCount: number;
}
