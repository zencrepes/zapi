import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import UserEdge from './userEdge';

@ObjectType()
export default class UserConnection {
  @Field(type => [UserEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: UserEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
