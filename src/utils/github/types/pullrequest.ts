import { Field, ObjectType, ID } from '@nestjs/graphql';

import UserConnection from './userConnection';
import ReviewRequestConnection from './reviewRequestConnection';
import LabelConnection from './labelConnection';
import CommentConnection from './commentConnection';
import ProjectCardConnection from './projectCardConnection';
import Actor from './actor';
import Repository from './repository';
import Milestone from './milestone';
import PullRequestReviewConnection from './pullRequestReviewConnection';

@ObjectType()
export default class PullRequest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => UserConnection, {
    nullable: true,
    description: 'A list of Users assigned to this object.',
  })
  assignees: UserConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ReviewRequestConnection, {
    nullable: true,
    description: 'A list of Review Requests assigned to this object.',
  })
  reviewRequests: ReviewRequestConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => PullRequestReviewConnection, {
    nullable: true,
    description: 'A list of Reviews assigned to this object.',
  })
  reviews: PullRequestReviewConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Actor, {
    nullable: false,
    description: 'The actor who authored the comment.',
  })
  author: Actor;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the body of the PR.',
  })
  body: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => CommentConnection, {
    nullable: false,
    description: 'A list of comments',
  })
  comments: CommentConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => LabelConnection, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  labels: LabelConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Milestone, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  milestone: Milestone;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => UserConnection, {
    nullable: false,
    description: 'A list of Users that are participating in the conversation.',
  })
  participants: UserConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ProjectCardConnection, {
    nullable: false,
    description: 'List of associated project cards.',
  })
  projectCards: ProjectCardConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Repository, {
    nullable: false,
    description: 'The repository where the PR is located',
  })
  repository: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
