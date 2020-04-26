import { Field, ObjectType, Int } from '@nestjs/graphql';

import ReviewRequestEdge from './reviewRequestEdge';

@ObjectType()
export default class ReviewRequestConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [ReviewRequestEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: ReviewRequestEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
