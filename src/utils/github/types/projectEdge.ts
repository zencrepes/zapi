import { Field, ObjectType } from '@nestjs/graphql';

import Project from './project';

@ObjectType()
export default class ProjectEdge {
  @Field(() => Project, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Project;
}
