import { Field, ObjectType, Int } from '@nestjs/graphql';

import JiraIssueEdge from './issueEdge';

@ObjectType()
export default class JiraIssueConnection {
  @Field(() => [JiraIssueEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: JiraIssueEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
