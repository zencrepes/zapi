import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class ProjectCard {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;
}
