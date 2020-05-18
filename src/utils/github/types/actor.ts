import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Actor {
  @Field(() => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(() => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this actor.',
  })
  url: string;
}
