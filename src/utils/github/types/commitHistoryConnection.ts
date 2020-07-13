import { Field, ObjectType, Int } from '@nestjs/graphql';

import CommitEdge from './commitEdge';

@ObjectType()
export default class CommitHistoryConnection {
  @Field(() => [CommitEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: CommitEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
