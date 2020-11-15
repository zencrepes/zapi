import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class JiraIssueBucketWeek {
  @Field({
    nullable: false,
    description: 'First day of the week',
  })
  weekStart: string;

  @Field({
    nullable: false,
    description: 'The number of documents that week',
  })
  docCount: number;

  @Field({
    nullable: true,
    description: 'The number of points that week',
  })
  sum: number;
}
