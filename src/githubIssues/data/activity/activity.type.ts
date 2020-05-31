import { Field, ObjectType } from '@nestjs/graphql';

import Bucket from './bucket.type';

@ObjectType()
export default class IssueDataActivity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The filed that was aggregated on',
  })
  field: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [Bucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: Bucket[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Overall first week (first day of the week) in the aggregated buckets',
  })
  fromWeekStart: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Overall last week (first day of the week) in the aggregated buckets',
  })
  toWeekStart: string;
}
