import { Field, ObjectType, Int } from '@nestjs/graphql';

import JiraIssueRemoteLinkEdge from './issueRemoteLinkEdge';

@ObjectType()
export default class JiraIssueRemoteLinkConnection {
  @Field(() => [JiraIssueRemoteLinkEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: JiraIssueRemoteLinkEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
