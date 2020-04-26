import { Field, ObjectType } from '@nestjs/graphql';

import Dataset from './dataset.type';

@ObjectType()
export default class Datasets {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Total count of elements',
  })
  totalCount: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [Dataset], {
    nullable: false,
    description: 'A list of available datasets',
  })
  nodes: Dataset[];
}
