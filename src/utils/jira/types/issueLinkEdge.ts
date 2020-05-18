import { Field, ObjectType } from '@nestjs/graphql';

import JiraIssueLink from './issueLink';

@ObjectType()
export default class JiraIssueLinkEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => JiraIssueLink, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: JiraIssueLink;
}
