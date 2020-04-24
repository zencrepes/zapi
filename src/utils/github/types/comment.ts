import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export default class Comments {
  @Field(type => ID)
  id: string;
}
