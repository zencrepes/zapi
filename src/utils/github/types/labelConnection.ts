import { Field, ObjectType, Int } from '@nestjs/graphql';

import LabelEdge from './labelEdge';

@ObjectType()
export default class LabelConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [LabelEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: LabelEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
