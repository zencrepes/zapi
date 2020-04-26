import { Field, ObjectType } from '@nestjs/graphql';

import Bucket from './bucket.type';

@ObjectType()
export default class DataAggregations {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The field that was aggregated on',
  })
  field: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [Bucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: Bucket[];
}
