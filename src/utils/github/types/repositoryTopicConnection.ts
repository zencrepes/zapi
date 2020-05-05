import { Field, ObjectType, Int } from '@nestjs/graphql';

import RepositoryTopicEdge from './repositoryTopicEdge';

@ObjectType()
export default class RepositoryTopicConnection {
  @Field(() => [RepositoryTopicEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: RepositoryTopicEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
