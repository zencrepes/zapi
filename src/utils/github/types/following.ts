import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Following {
  @Field(() => ID)
  id: string;
}
