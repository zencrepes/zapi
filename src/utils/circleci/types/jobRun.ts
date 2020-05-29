import { Field, ObjectType, ID } from '@nestjs/graphql';

import CircleciJob from './job';

@ObjectType()
export default class CircleciJobRun {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Run started at',
  })
  started_at: string;

  @Field(() => String, {
    nullable: false,
    description: 'Run stopped at',
  })
  stopped_at: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Run duration',
  })
  duration: number;

  @Field(() => String, {
    nullable: false,
    description: 'Run status',
  })
  status: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Credits used for the run',
  })
  credits_used: number;

  @Field(() => CircleciJob, {
    nullable: true,
    description: 'The job',
  })
  job: CircleciJob;
}
