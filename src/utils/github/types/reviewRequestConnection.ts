import { Field, ObjectType, ID, Int } from 'type-graphql';

import ReviewRequestEdge from './reviewRequestEdge';

@ObjectType()
export default class ReviewRequestConnection {
  @Field(type => [ReviewRequestEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ReviewRequestEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
