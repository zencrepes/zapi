import { Field, ObjectType, ID } from '@nestjs/graphql';

import PerfRunMetric from './perfRunMetric'

@ObjectType()
export default class PerfAverageAverage {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Object key in the statistics.json payload (sampleCount, errorCount, minResTime, ...)',
  })
  statisticsKey: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the transaction',
  })
  transaction: string;  

  @Field(() => Number, {
    nullable: false,
    description: 'Average value for that key in that transaction',
  })
  value: number;  

  @Field(() => [PerfRunMetric], {
    nullable: false,
    description: 'List of runs used when calculating the average',
  })
  runs: PerfRunMetric[];
}
