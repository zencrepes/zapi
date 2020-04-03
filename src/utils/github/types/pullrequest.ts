import { Field, ObjectType, ID } from 'type-graphql';

import UserConnection from './userConnection';
import LabelConnection from './labelConnection';
import CommentConnection from './commentConnection';
import ProjectCardConnection from './projectCardConnection';
import Actor from './actor';
import Repository from './repository';
import Milestone from './milestone';

@ObjectType()
export default class PullRequest {
  @Field(type => ID)
  id: string;

  @Field(type => UserConnection, {
    nullable: true,
    description: 'A list of Users assigned to this object.',
  })
  assignees: UserConnection;

  @Field(type => Actor, {
    nullable: false,
    description: 'The actor who authored the comment.',
  })
  author: Actor;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the body of the PR.',
  })
  body: string;

  @Field(type => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field(type => CommentConnection, {
    nullable: false,
    description: 'A list of comments',
  })
  comments: CommentConnection;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(type => LabelConnection, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  labels: LabelConnection;

  @Field(type => Milestone, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  milestone: Milestone;

  @Field(type => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  @Field(type => UserConnection, {
    nullable: false,
    description: 'A list of Users that are participating in the conversation.',
  })
  participants: UserConnection;

  @Field(type => ProjectCardConnection, {
    nullable: false,
    description: 'List of associated project cards.',
  })
  projectCards: ProjectCardConnection;

  @Field(type => String, {
    nullable: false,
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(type => Repository, {
    nullable: false,
    description: 'The repository where the PR is located',
  })
  repository: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
