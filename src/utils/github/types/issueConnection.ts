import { Field, ObjectType, Int } from '@nestjs/graphql';

import IssueEdge from './issueEdge';

@ObjectType()
export default class IssueConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [IssueEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: IssueEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
