import { Field, ObjectType, ID } from '@nestjs/graphql';

import Project from './project';
import ProjectColumn from './projectColumn';

@ObjectType()
export default class ProjectCard {
  @Field(() => ID)
  id: string;

  @Field(() => Project, {
    nullable: true,
    description: 'The project attached to the card',
  })
  project: Project;

  @Field(() => ProjectColumn, {
    nullable: true,
    description: 'The project attached to the card',
  })
  column: ProjectColumn;
}
