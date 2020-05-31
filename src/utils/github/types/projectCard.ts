import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class ProjectCard {
  @Field(() => ID)
  id: string;
}
