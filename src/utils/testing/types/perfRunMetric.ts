import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class PerfRunMetric {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the element being tested',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the performance run was started',
  })
  startedAt: string;

  @Field({
    nullable: true,
    description: 'Value of a single run metric (where relevant)',
  })
  value: number;

}
