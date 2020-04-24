import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import LabelEdge from './labelEdge';

@ObjectType()
export default class LabelConnection {
  @Field(type => [LabelEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: LabelEdge[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
