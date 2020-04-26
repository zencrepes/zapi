import { Field, ObjectType } from '@nestjs/graphql';

import Issue from './issue';

@ObjectType()
export default class IssueEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Issue, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Issue;
}
