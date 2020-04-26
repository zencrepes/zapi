import { Field, ObjectType, Int } from '@nestjs/graphql';

import ProjectCardEdge from './projectCardEdge';

@ObjectType()
export default class ProjectCardConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [ProjectCardEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ProjectCardEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
