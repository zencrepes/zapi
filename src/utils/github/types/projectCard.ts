import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export default class ProjectCard {
  @Field(type => ID)
  id: string;
}
