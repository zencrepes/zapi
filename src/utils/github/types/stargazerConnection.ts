import { Field, ObjectType, Int } from '@nestjs/graphql';

import StargazerEdge from './releaseEdge';

@ObjectType()
export default class StargazerConnection {
  @Field(() => [StargazerEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: StargazerEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
