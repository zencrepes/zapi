import { Field, ObjectType, Int } from '@nestjs/graphql';

import IssueTimelineItemsEdge from './releaseEdge';

@ObjectType()
export default class IssueTimelineItemsConnection {
  @Field(() => [IssueTimelineItemsEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: IssueTimelineItemsEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
