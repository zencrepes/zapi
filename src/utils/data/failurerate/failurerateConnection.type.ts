import { Field, ObjectType } from '@nestjs/graphql';

import FailureRateBucket from './failurerateBucket.type';

@ObjectType({ isAbstract: true })
export default abstract class FailureRateConnection {
  @Field(() => String, {
    nullable: true,
    description: 'Field used to aggregate on',
  })
  field: string;

  @Field(() => [FailureRateBucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: FailureRateBucket[];

  @Field(() => String, {
    nullable: false,
    description: 'Overall first week (first day of the week) in the aggregated buckets',
  })
  fromDateStart: string;

  @Field(() => String, {
    nullable: false,
    description: 'Overall last week (first day of the week) in the aggregated buckets',
  })
  toDateStart: string;
}
