import { Field, ObjectType, ID, Int } from 'type-graphql';

import IssueConnection from './issueConnection';

@ObjectType()
export default class Milestone {
  @Field(type => ID)
  id: string;

  @Field(type => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field(type => String, {
    nullable: false,
    description: 'Description of the Milestone',
  })
  description: string;

  @Field(type => String, {
    nullable: true,
    description: 'When is the milestone due',
  })
  dueOn?: string;

  @Field(type => IssueConnection, {
    nullable: true,
    description: 'When is the milestone due',
  })
  issues: IssueConnection;

  @Field(type => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(type => String, {
    nullable: false,
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
