import { Field, ObjectType } from '@nestjs/graphql';

import PipelineTriggerActor from './pipelineTriggerActor';

@ObjectType()
export default class PipelineTrigger {
  @Field(() => String, {
    nullable: false,
    description: 'Type of trigger',
  })
  type: string;

  @Field(() => PipelineTriggerActor, {
    nullable: false,
    description: 'Actor who triggered the pipeline',
  })
  actor: PipelineTriggerActor;
}
