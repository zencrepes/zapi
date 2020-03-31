import { Field, ObjectType, ID } from 'type-graphql';

import Bucket from './bucket.type';

@ObjectType()
export default class Aggregations {
  @Field(type => String, {
    nullable: false,
    description: 'The filed that was aggregated on',
  })
  field: string;

  @Field(type => [Bucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: Bucket[];
}
