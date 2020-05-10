import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Follower {
  @Field(() => ID)
  id: string;
}
