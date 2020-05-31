import { Field, ObjectType } from '@nestjs/graphql';

import ProjectCard from './projectCard';

@ObjectType()
export default class ProjectCardEdge {
  @Field(() => ProjectCard, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ProjectCard;
}
