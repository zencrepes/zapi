import { Field, ObjectType } from '@nestjs/graphql';

import CircleciMetricsDuration from './metricsDuration';

@ObjectType()
export default class CircleciWorkflowMetrics {
  @Field(() => Number, {
    nullable: true,
    description: 'Success rate',
  })
  success_rate: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Total runs for the workflow',
  })
  total_runs: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Number of failed runs',
  })
  failed_runs: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Number of successful runs',
  })
  successful_runs: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Throughput',
  })
  throughput: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Total credits used',
  })
  total_credits_used: number;

  @Field(() => CircleciMetricsDuration, {
    nullable: true,
    description: 'Duration metrics for the runs',
  })
  duration_metrics: CircleciMetricsDuration;
}
