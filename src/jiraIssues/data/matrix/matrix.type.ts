import { Field, ObjectType } from '@nestjs/graphql';

import JiraIssueActivityBucket from './bucket.type';

@ObjectType({ isAbstract: true })
export default abstract class JiraMatrixConnection {
  @Field(() => String, {
    nullable: true,
    description: 'Current Velocity data',
  })
  field: string;

  @Field(() => [JiraIssueActivityBucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: JiraIssueActivityBucket[];

  @Field(() => String, {
    nullable: false,
    description: 'Overall first week (first day of the week) in the aggregated buckets',
  })
  fromWeekStart: string;

  @Field(() => String, {
    nullable: false,
    description: 'Overall last week (first day of the week) in the aggregated buckets',
  })
  toWeekStart: string;
}
