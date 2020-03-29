import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export default class Comments {
  @Field(type => ID)
  id: string;
}
