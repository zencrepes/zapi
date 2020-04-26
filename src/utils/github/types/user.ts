import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this actor.',
  })
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'The user public profile name.',
  })
  name: string;
}
