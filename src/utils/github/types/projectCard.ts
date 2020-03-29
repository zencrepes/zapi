import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export default class ProjectCard {
  @Field(type => ID)
  id: string;
}
