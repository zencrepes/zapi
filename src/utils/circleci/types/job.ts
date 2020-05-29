import { Field, ObjectType } from '@nestjs/graphql';

import CircleciJobMetrics from './jobMetrics';
import CircleciWorkflow from './workflow';

@ObjectType()
export default class CircleciJob {
  @Field(() => String, {
    nullable: true,
    description: 'Name of the workflow',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Start of the metrics window',
  })
  window_start: string;

  @Field(() => String, {
    nullable: false,
    description: 'End of the metrics window',
  })
  window_end: string;

  @Field(() => CircleciJobMetrics, {
    nullable: true,
    description: 'Job Metrics',
  })
  metrics: CircleciJobMetrics;

  @Field(() => CircleciWorkflow, {
    nullable: true,
    description: 'Job Workflow',
  })
  workflow: CircleciWorkflow;
}
