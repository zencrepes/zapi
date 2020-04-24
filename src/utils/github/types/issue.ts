import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export default class Issue {
  @Field(type => ID)
  id: string;
}
