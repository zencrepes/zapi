import { Field, ObjectType, Int } from '@nestjs/graphql';

import RepositoryEdge from './repositoryEdge';

@ObjectType()
export default class RepositoryConnection {
  @Field(() => [RepositoryEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: RepositoryEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
