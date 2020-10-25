import { Field, ObjectType, Int } from '@nestjs/graphql';

import DependencyEdge from './dependencyEdge';

@ObjectType()
export default class DependencyConnection {
  @Field(() => [DependencyEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: DependencyEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
