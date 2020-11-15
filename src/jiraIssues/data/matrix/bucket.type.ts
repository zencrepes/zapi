import { Field, ObjectType } from '@nestjs/graphql';

import JiraIssueBucketWeek from './week.type';

@ObjectType()
export default class JiraIssueActivityBucket {
  @Field({
    nullable: false,
    description: 'The Bucket key',
  })
  key: string;

  @Field({
    nullable: true,
    description: 'Representation of the key as a string (useful for dates)',
  })
  keyAsString: string;

  @Field({
    nullable: false,
    description: 'The number of elements in the bucket',
  })
  docCount: number;

  @Field({
    nullable: true,
    description: 'The number of points in the bucket',
  })
  sum: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [JiraIssueBucketWeek], {
    nullable: false,
    description: 'Weeks of activity',
  })
  weeks: JiraIssueBucketWeek[];
}
