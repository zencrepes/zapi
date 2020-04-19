import { Field, ObjectType, ID } from '@nestjs/graphql';

import Dataset from './dataset.type';

@ObjectType()
export default class Datasets {
  @Field(type => Number, {
    nullable: false,
    description: 'Total count of elements',
  })
  totalCount: number;

  @Field(type => [Dataset], {
    nullable: false,
    description: 'A list of available datasets',
  })
  nodes: Dataset[];
}
