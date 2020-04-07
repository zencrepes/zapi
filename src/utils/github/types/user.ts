import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export default class User {
  @Field(type => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  @Field(type => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this actor.',
  })
  url: string;

  @Field(type => String, {
    nullable: true,
    description: 'The user public profile name.',
  })
  name: string;
}
