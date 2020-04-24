import { Field, ObjectType, ID } from '@nestjs/graphql';

import Bucket from './bucket.type';

@ObjectType()
export default class DataActivity {
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

  @Field(type => String, {
    nullable: false,
    description:
      'Overall first week (first day of the week) in the aggregated buckets',
  })
  fromWeekStart: string;

  @Field(type => String, {
    nullable: false,
    description:
      'Overall last week (first day of the week) in the aggregated buckets',
  })
  toWeekStart: string;
}
