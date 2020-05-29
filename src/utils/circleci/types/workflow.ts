import { Field, ObjectType, ID } from '@nestjs/graphql';

import Source from './source';

@ObjectType()
export default class CircleciWorkflow {
  @Field(() => ID)
  id: string;

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

  @Field(() => Source, {
    nullable: true,
    description: 'The source repository.',
  })
  source: Source;
}
