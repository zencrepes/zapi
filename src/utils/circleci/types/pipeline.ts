import { Field, ObjectType, ID } from '@nestjs/graphql';

import PipelineError from './pipelineError';
import PipelineTrigger from './pipelineTrigger';
import Source from './source';
import Vcs from './vcs';

@ObjectType()
export default class Pipeline {
  @Field(() => ID)
  id: string;

  @Field(() => [PipelineError], {
    nullable: false,
    description: 'Errors associated with the pipeline',
  })
  errors: PipelineError[];

  @Field(() => String, {
    nullable: false,
    description: 'The value of the environment variable',
  })
  project_slug: string;

  @Field(() => String, {
    nullable: false,
    description: 'Pipeline number',
  })
  number: string;

  @Field(() => String, {
    nullable: false,
    description: 'Pipeline state',
  })
  state: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => PipelineTrigger, {
    nullable: false,
    description: 'The pipeline trigger',
  })
  trigger: PipelineTrigger;

  @Field(() => Vcs, {
    nullable: false,
    description: 'Vcs details associated with the trigger',
  })
  vcs: Vcs;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was updated.',
  })
  updatedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was triggered.',
  })
  triggeredAt: string;

  @Field(() => Source, {
    nullable: false,
    description: 'The environment variable source',
  })
  source: Source;
}
