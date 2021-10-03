import { Field, ObjectType, Int } from '@nestjs/graphql';

import PerfRunEdge from './perfRunEdge';

@ObjectType()
export default class PerfRunConnection {
  @Field(() => [PerfRunEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: PerfRunEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
