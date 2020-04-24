import { Field, ObjectType } from '@nestjs/graphql';

import Bucket from './bucket.type';

@ObjectType()
export default class DataAggregations {
  @Field(type => String, {
    nullable: false,
    description: 'The field that was aggregated on',
  })
  field: string;

  @Field(type => [Bucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: Bucket[];
}
