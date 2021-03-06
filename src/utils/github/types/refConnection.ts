import { Field, ObjectType, Int } from '@nestjs/graphql';

import RefEdge from './refEdge';

@ObjectType()
export default class RefConnection {
  @Field(() => [RefEdge], {
    nullable: true,
    description: 'A list of edges.',
  })
  edges: RefEdge[];

  @Field(() => Int, {
    nullable: true,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
