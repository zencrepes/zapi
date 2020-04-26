import { Field, ObjectType } from '@nestjs/graphql';

import ProjectCard from './projectCard';

@ObjectType()
export default class ProjectCardEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ProjectCard, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ProjectCard;
}
