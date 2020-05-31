import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Actor {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(() => String, {
    nullable: true,
    description: 'The name of the actor.',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'The company of the actor.',
  })
  company: string;

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
