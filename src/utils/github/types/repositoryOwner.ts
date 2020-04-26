import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class RepositoryOwner {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;
}
