import { Field, ObjectType, ClassType, Int } from 'type-graphql';

import Dataset from './dataset.type';

@ObjectType()
export default class DatasetConnection {
  @Field(type => [Dataset], {
    nullable: false,
    description: 'A list of edges.',
  })
  nodes: Dataset[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: number;
}
