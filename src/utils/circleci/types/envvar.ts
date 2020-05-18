import { Field, ObjectType, ID } from '@nestjs/graphql';

import Source from './source';

@ObjectType()
export default class Envvar {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The name of the environment variable',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'The value of the environment variable',
  })
  value: string;

  @Field(() => String, {
    nullable: false,
    description: 'Link to the configuration page for this environment variable',
  })
  url: string;

  @Field(() => Source, {
    nullable: false,
    description: 'The environment variable source',
  })
  source: Source;
}
