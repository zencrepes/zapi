import { Field, ObjectType, Int } from '@nestjs/graphql';

import RefEdge from './refEdge';

@ObjectType()
export default class RefConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [RefEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: RefEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
