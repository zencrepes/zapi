import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Aggregation {
  @Field({
    nullable: false,
    description: 'The Bucket key',
  })
  key: string;

  @Field({
    nullable: false,
    description: 'The number of elements in the bucket',
  })
  docCount: number;
}
