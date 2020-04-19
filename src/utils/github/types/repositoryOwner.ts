import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export default class RepositoryOwner {
  @Field(type => ID)
  id: string;

  @Field(type => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;
}
