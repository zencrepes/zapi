import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import RepositoryOwner from './repositoryOwner';

@ObjectType()
export default class Repository {
  @Field(type => ID)
  id: string;

  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(type => String, {
    nullable: true,
    description: 'The name of the repository.',
  })
  name: string;

  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;

  @Field(type => RepositoryOwner, {
    nullable: false,
    description: 'The User owner of the repository.',
  })
  owner: RepositoryOwner;
}
