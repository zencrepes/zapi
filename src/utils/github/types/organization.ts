import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Organization {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field(() => String, {
    nullable: false,
    description: ' The organization login name.',
  })
  login: string;

  @Field(() => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this actor.',
  })
  url: string;

  @Field(() => String, {
    nullable: true,
    description: 'The organization public profile name.',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'The organization public profile name.',
  })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'The organization public profile URL.',
  })
  websiteUrl: string;
}
