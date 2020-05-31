import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class IssueBucketWeek {
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
}
