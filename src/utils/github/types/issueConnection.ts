import { Field, ObjectType, ID, Int } from 'type-graphql';

import IssueEdge from './issueEdge';

@ObjectType()
export default class IssueConnection {
  @Field(type => [IssueEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: IssueEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
