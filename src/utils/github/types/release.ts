import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Release {
  @Field(() => ID)
  id: string;
}
