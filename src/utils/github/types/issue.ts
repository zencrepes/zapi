import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export default class Issue {
  @Field(type => ID)
  id: string;
}
