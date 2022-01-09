import { Field, ObjectType, ID } from '@nestjs/graphql';

import Perf from './perf';
import PerfAverageAverage from './perfAverageAverage';
import PerfAverageValue from './perfAverageValue';

@ObjectType()
export default class PerfAverage {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => [Perf], {
    nullable: false,
    description: 'List of runs used when calculating the average',
  })
  runs: Perf[];

  @Field(() => [PerfAverageAverage], {
    nullable: false,
    description: 'Computed average values per key and transaction',
  })
  average: PerfAverageAverage[];

  @Field(() => [PerfAverageValue], {
    nullable: false,
    description: 'Indidual run metrics per key and per transaction',
  })
  values: PerfAverageValue[];

  @Field(() => [String], {
    nullable: false,
    description: 'List of available transactions',
  })
  transactions: [string];    

  @Field(() => [String], {
    nullable: false,
    description: 'List of available statistics keys',
  })
  statisticsKeys: [string];   
}
