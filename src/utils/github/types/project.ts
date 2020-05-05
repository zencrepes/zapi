import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Project {
  @Field(() => ID)
  id: string;
}
