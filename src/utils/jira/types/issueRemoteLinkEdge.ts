import { Field, ObjectType } from '@nestjs/graphql';

import JiraIssue from './issue';

@ObjectType()
export default class JiraIssueRemoteLinkEdge {
  @Field(() => JiraIssue, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: JiraIssue;
}
