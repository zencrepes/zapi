import { Field, ObjectType, ID } from '@nestjs/graphql';

import ProjectColumnConnection from './projectColumnConnection';
import ProjectCardConnection from './projectCardConnection';
import Repository from './repository';
import Organization from './organization';

@ObjectType()
export default class Project {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Is the project attached to an organization, a repository or a user',
  })
  projectLevel: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(() => String, {
    nullable: false,
    description: ' Identifies the project number.',
  })
  number: number;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the object name.',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the object state.',
  })
  state: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the object body.',
  })
  body: string;

  @Field(() => ProjectColumnConnection, {
    nullable: false,
    description: 'List of associated project columns.',
  })
  columns: ProjectColumnConnection;

  @Field(() => ProjectCardConnection, {
    nullable: false,
    description: 'List of pending project cards.',
  })
  pendingCards: ProjectCardConnection;

  @Field(() => Repository, {
    nullable: true,
    description: 'The repository where the project is located',
  })
  repository: string;

  @Field(() => Organization, {
    nullable: false,
    description: 'The organization where the project is located',
  })
  organization: string;
}
