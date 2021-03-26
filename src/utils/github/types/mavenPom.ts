import { Field, ObjectType, ID } from '@nestjs/graphql';

import RepositoryOwner from './repositoryOwner';
import Ref from './ref';
import RepositoryTopicConnection from './repositoryTopicConnection';
import MavenPomContent from './mavenPomContent';

@ObjectType()
export default class MavenPom {
  @Field(() => ID)
  id: string;

  @Field({
    nullable: true,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(() => String, {
    nullable: true,
    description: 'The name of the repository.',
  })
  name: string;

  @Field(() => MavenPomContent, {
    nullable: true,
    description: 'Content of the POM file',
  })
  pom: MavenPomContent;  

  @Field(() => String, {
    nullable: true,
    description: 'The repository name with owner.',
  })
  nameWithOwner: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this repository.',
  })
  url: string;

  @Field(() => RepositoryOwner, {
    nullable: false,
    description: 'The User owner of the repository.',
  })
  owner: RepositoryOwner;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => Ref, {
    nullable: true,
    description: 'The Ref associated with the repository default branch.',
  })
  defaultBranchRef: Ref;

  @Field(() => String, {
    nullable: true,
    description: 'The description of the repository.',
  })
  description: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the repository is unmaintained.',
  })
  isArchived: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Returns whether or not this repository disabled.',
  })
  isDisabled: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository is a fork.',
  })
  isFork: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository contains a pom file',
  })
  hasPom: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository pom file has a parent',
  })
  hasParent: boolean;  

  @Field(() => String, {
    nullable: true,
    description: 'Identifies when the repository was last pushed to.',
  })
  pushedAt: string;

  @Field(() => Ref, {
    nullable: true,
    description: 'Link to the ref containing recent commits to master',
  })
  lastCommitMainBranch: Ref;

  @Field(() => RepositoryTopicConnection, {
    nullable: true,
    description: 'A list of applied repository-topic associations for this repository.',
  })
  repositoryTopics: RepositoryTopicConnection;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

}
