import { Field, ObjectType } from '@nestjs/graphql';

import ProjectColumn from './projectColumn';

@ObjectType()
export default class ProjectColumnEdge {
  @Field(() => ProjectColumn, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: ProjectColumn;
}
