import { Field, ObjectType, ID } from '@nestjs/graphql';
import Repository from './repository';
import IssueConnection from './issueConnection';
import PullRequestConnection from './pullRequestConnection';

@ObjectType()
export default class Label {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the label color.',
  })
  color: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the label name.',
  })
  name: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Is this a default label',
  })
  isDefault: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'A brief description of this label.',
  })
  description: string;

  @Field(() => Repository, {
    nullable: false,
    description: 'The repository where the PR is located',
  })
  repository: string;

  @Field(() => IssueConnection, {
    nullable: true,
    description: 'A list of issues that have been opened in the repository.',
  })
  issues: IssueConnection;

  @Field(() => PullRequestConnection, {
    nullable: true,
    description: 'A list of pull requests that have been opened in the repository.',
  })
  pullRequests: PullRequestConnection;

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
