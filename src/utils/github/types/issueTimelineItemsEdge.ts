import { Field, ObjectType } from '@nestjs/graphql';

import CrossReferencedEvent from './crossReferencedEvent';

@ObjectType()
export default class IssueTimelineItemsEdge {
  @Field(() => CrossReferencedEvent, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: CrossReferencedEvent;
}
