import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class EnvvarRepositoryOwner {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;
}
