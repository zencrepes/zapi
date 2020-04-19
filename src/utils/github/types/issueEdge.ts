import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import Issue from './issue';

@ObjectType()
export default class IssueEdge {
  @Field(type => Issue, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Issue;
}
