import { Field, ObjectType, ID } from '@nestjs/graphql';

import IssueConnection from './issueConnection';

@ObjectType()
export default class Milestone {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Description of the Milestone',
  })
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'When is the milestone due',
  })
  dueOn?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => IssueConnection, {
    nullable: true,
    description: 'When is the milestone due',
  })
  issues: IssueConnection;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
