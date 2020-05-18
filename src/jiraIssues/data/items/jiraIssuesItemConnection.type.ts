import { Field, ObjectType, Int } from '@nestjs/graphql';

import Issue from '../../../utils/jira/types/issue';

@ObjectType()
export default class JiraIssueItemConnection {
  @Field(() => [Issue], { nullable: true })
  nodes: Issue[];

  @Field(() => Int)
  totalCount: number;
}
