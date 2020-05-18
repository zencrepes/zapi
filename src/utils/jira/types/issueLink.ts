import { Field, ObjectType, ID } from '@nestjs/graphql';

import JiraIssue from './issue';
import JiraIssueLinkType from './issueLinkType';

@ObjectType()
export default class JiraIssueLink {
  @Field(() => ID)
  id: string;

  @Field(() => JiraIssueLinkType, {
    nullable: false,
    description: 'Type of link',
  })
  type: JiraIssueLinkType;

  @Field(() => JiraIssue, {
    nullable: true,
    description: 'This is an outward issue link',
  })
  outwardIssue: JiraIssue;

  @Field(() => JiraIssue, {
    nullable: true,
    description: 'This is an inward issue link',
  })
  inwardIssue: JiraIssue;
}
