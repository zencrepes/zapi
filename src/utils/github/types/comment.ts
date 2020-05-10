import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Comments {
  @Field(() => ID)
  id: string;
}
