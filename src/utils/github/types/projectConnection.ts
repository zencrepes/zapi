import { Field, ObjectType, Int } from '@nestjs/graphql';

import ProjectEdge from './projectEdge';

@ObjectType()
export default class ProjectConnection {
  @Field(() => [ProjectEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ProjectEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
