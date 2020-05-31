import { Field, ObjectType, Int } from '@nestjs/graphql';

import Issue from '../../../utils/github/types/issue';

@ObjectType()
export default class IssuesItemConnection {
  @Field(() => [Issue], { nullable: true })
  nodes: Issue[];

  @Field(() => Int)
  totalCount: number;
}
