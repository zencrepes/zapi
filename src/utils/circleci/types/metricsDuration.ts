import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CircleciMetricsDuration {
  @Field(() => Number, {
    nullable: true,
    description: 'Max',
  })
  min: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Min',
  })
  max: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Median',
  })
  median: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Mean',
  })
  mean: number;

  @Field(() => Number, {
    nullable: true,
    description: '95th percentile',
  })
  p95: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Standard Deviation',
  })
  standard_deviation: number;
}
