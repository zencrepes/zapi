import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import ProjectCardEdge from './projectCardEdge';

@ObjectType()
export default class ProjectCardConnection {
  @Field(type => [ProjectCardEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ProjectCardEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
