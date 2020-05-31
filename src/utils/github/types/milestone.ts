import { Field, ObjectType, ID } from '@nestjs/graphql';

import Repository from './repository';
import IssueConnection from './issueConnection';
import PullRequestConnection from './pullRequestConnection';

@ObjectType()
export default class Milestone {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description of the Milestone',
  })
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'When is the milestone due',
  })
  dueOn?: string;

  @Field(() => IssueConnection, {
    nullable: true,
    description: 'When is the milestone due',
  })
  issues: IssueConnection;

  @Field(() => PullRequestConnection, {
    nullable: true,
    description: 'A list of pull requests that have been opened in the repository.',
  })
  pullRequests: PullRequestConnection;

  @Field(() => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

  @Field(() => Repository, {
    nullable: false,
    description: 'The repository where the PR is located',
  })
  repository: string;
}
