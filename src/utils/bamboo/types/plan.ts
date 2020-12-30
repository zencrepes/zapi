import { Field, ObjectType, ID } from '@nestjs/graphql';

import BambooProject from './project';

@ObjectType()
export default class BambooPlan {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the plan',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Short key of the plan',
  })
  shortKey: string;

  @Field(() => BambooProject, {
    nullable: false,
    description: 'Bamboo project attached to the run',
  })
  project: BambooProject;

}
