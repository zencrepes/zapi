import { Field, ObjectType, Int } from '@nestjs/graphql';

import UserEdge from './userEdge';

@ObjectType()
export default class UserConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [UserEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: UserEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
