import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Aggregations {
  @Field(() => ID)
  id: string;
}
