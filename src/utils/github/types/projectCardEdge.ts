import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import ProjectCard from './projectCard';

@ObjectType()
export default class ProjectCardEdge {
  @Field(type => ProjectCard, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ProjectCard;
}
