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
export default class Issue {
  @Field(() => ID)
  id: string;

  @Field(() => UserConnection, {
    nullable: true,
    description: 'A list of Users assigned to this object.',
  })
  assignees: UserConnection;

  @Field(() => ReviewRequestConnection, {
    nullable: true,
    description: 'A list of Review Requests assigned to this object.',
  })
  reviewRequests: ReviewRequestConnection;

  @Field(() => PullRequestReviewConnection, {
    nullable: true,
    description: 'A list of Reviews assigned to this object.',
  })
  reviews: PullRequestReviewConnection;

  @Field(() => Actor, {
    nullable: true,
    description: 'The actor who authored the comment.a',
  })
  author: Actor;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the body of the PR.',
  })
  body: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field(() => CommentConnection, {
    nullable: true,
    description: 'A list of comments',
  })
  comments: CommentConnection;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field({
    nullable: true,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field({
    nullable: true,
    description: 'Story points assocaited with the issue',
  })
  points: number;

  @Field(() => LabelConnection, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  labels: LabelConnection;

  @Field(() => Milestone, {
    nullable: true,
    description: 'A list of labels associated with the object.',
  })
  milestone: Milestone;

  @Field(() => String, {
    nullable: true,
    description: ' Identifies the issue number.',
  })
  number: number;

  @Field(() => UserConnection, {
    nullable: true,
    description: 'A list of Users that are participating in the conversation.',
  })
  participants: UserConnection;

  @Field(() => ProjectCardConnection, {
    nullable: true,
    description: 'List of associated project cards.',
  })
  projectCards: ProjectCardConnection;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(() => Repository, {
    nullable: true,
    description: 'The repository where the PR is located',
  })
  repository: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
