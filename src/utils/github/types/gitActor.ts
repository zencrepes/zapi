import { Field, ObjectType } from '@nestjs/graphql';

import User from './user';

@ObjectType()
export default class GitActor {
  @Field(() => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(() => String, {
    nullable: true,
    description: 'The timestamp of the Git action (authoring or committing)',
  })
  date: string;

  @Field(() => String, {
    nullable: true,
    description: 'The email in the Git commit.',
  })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'The name in the Git commit.',
  })
  name: string;

  @Field(() => User, {
    nullable: true,
    description: 'The GitHub user corresponding to the email field. Null if no such user exists.',
  })
  user: User;
}
