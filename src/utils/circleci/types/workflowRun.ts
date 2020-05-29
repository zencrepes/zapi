import { Field, ObjectType, ID } from '@nestjs/graphql';

import CircleciWorkflow from './workflow';

@ObjectType()
export default class CircleciWorkflowRun {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Run status',
  })
  status: string;

  @Field(() => String, {
    nullable: true,
    description: 'Duration in seconds',
  })
  duration: string;

  @Field(() => String, {
    nullable: false,
    description: 'The run was created at',
  })
  created_at: string;

  @Field(() => String, {
    nullable: false,
    description: 'The run was stopped at',
  })
  stopped_at: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Number of credits used',
  })
  credits_used: number;

  @Field(() => CircleciWorkflow, {
    nullable: true,
    description: 'The source repository.',
  })
  workflow: CircleciWorkflow;
}
