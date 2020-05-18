import { Field, ObjectType, ID } from '@nestjs/graphql';

import EnvvarRepositoryOwner from './repositoryOwner';

@ObjectType()
export default class EnvvarRepository {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'The name of the repository.',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;

  @Field(() => EnvvarRepositoryOwner, {
    nullable: false,
    description: 'The User owner of the repository.',
  })
  owner: EnvvarRepositoryOwner;
}
