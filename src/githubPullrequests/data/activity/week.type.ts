import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class BucketWeek {
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
