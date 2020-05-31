import { Field, ObjectType, Int } from '@nestjs/graphql';

import ProjectColumnEdge from './projectColumnEdge';

@ObjectType()
export default class ProjectColumnConnection {
  @Field(() => [ProjectColumnEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ProjectColumnEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
