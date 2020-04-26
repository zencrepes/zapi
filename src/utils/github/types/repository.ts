import { Field, ObjectType, ID } from '@nestjs/graphql';

import RepositoryOwner from './repositoryOwner';

@ObjectType()
export default class Repository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'The name of the repository.',
  })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => RepositoryOwner, {
    nullable: false,
    description: 'The User owner of the repository.',
  })
  owner: RepositoryOwner;
}
