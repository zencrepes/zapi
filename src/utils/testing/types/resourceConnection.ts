import { Field, ObjectType, Int } from '@nestjs/graphql';

import ResourceEdge from './resourceEdge';

@ObjectType()
export default class ResourceConnection {
  @Field(() => [ResourceEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ResourceEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
