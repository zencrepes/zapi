import { Field, ObjectType, Int } from '@nestjs/graphql';

import ReleaseEdge from './releaseEdge';

@ObjectType()
export default class ReleaseConnection {
  @Field(() => [ReleaseEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ReleaseEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
