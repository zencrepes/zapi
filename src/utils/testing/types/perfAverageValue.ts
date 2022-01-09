import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class PerfAverageValue {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the run',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the performance run was started',
  })
  startedAt: string;

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
    description: 'Value for that key in that transaction',
  })
  value: number;
}
