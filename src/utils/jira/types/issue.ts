import { Field, ObjectType, ID } from '@nestjs/graphql';

import JiraUser from './user';
import JiraServer from './server';
import JiraStatus from './status';
import JiraProject from './project';
import JiraResolution from './resolution';
import JiraVersionConnection from './versionConnection';
import JiraIssueLinkConnection from './issueLinkConnection';
import JiraIssueConnection from './issueConnection';
import JiraPriority from './priority';
import JiraIssueType from './issueType';

@ObjectType()
export default class JiraIssue {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was closed',
  })
  closedAt: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was last updated',
  })
  updatedAt: string;

  @Field(() => String, {
    nullable: true,
    description: 'URL of the issue to the source Jira instance',
  })
  url: string;

  @Field(() => JiraUser, {
    nullable: true,
    description: 'The issue assignee',
  })
  assignee: JiraUser;

  @Field(() => JiraUser, {
    nullable: false,
    description: 'The issue creator',
  })
  creator: JiraUser;

  @Field(() => JiraUser, {
    nullable: false,
    description: 'The issue reporter',
  })
  reporter: JiraUser;

  @Field(() => String, {
    nullable: true,
    description: 'Issue Key',
  })
  key: string;

  @Field(() => JiraIssueType, {
    nullable: true,
    description: 'The issue type',
  })
  type: JiraIssueType;

  @Field(() => String, {
    nullable: false,
    description: 'Summary (or title) of the issue',
  })
  summary: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description of the issue',
  })
  description: string;

  @Field(() => JiraServer, {
    nullable: true,
    description: 'Description of the issue',
  })
  server: JiraServer;

  @Field(() => JiraStatus, {
    nullable: true,
    description: 'Status of the issue',
  })
  status: JiraStatus;

  @Field(() => JiraProject, {
    nullable: true,
    description: 'Project of the issue',
  })
  project: JiraProject;

  @Field(() => JiraResolution, {
    nullable: true,
    description: 'Resolution of the issue',
  })
  resolution: JiraResolution;

  @Field(() => JiraVersionConnection, {
    nullable: false,
    description: 'A list of fixVersions',
  })
  fixVersions: JiraVersionConnection;

  @Field(() => JiraVersionConnection, {
    nullable: false,
    description: 'A list of Versions',
  })
  versions: JiraVersionConnection;

  @Field(() => JiraIssueLinkConnection, {
    nullable: false,
    description: 'A list of link to other issues',
  })
  links: JiraIssueLinkConnection;

  @Field(() => JiraIssueConnection, {
    nullable: false,
    description: 'A list of subtasks',
  })
  subtasks: JiraIssueConnection;

  @Field(() => String, {
    nullable: true,
    description: 'Issue key of the parent Epic',
  })
  parentEpic: string;

  @Field(() => String, {
    nullable: true,
    description: 'Issue key of the parent Initiative',
  })
  parentInitiative: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Issue points',
  })
  points: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Issue original points',
  })
  originalPoints: number;

  @Field(() => JiraPriority, {
    nullable: false,
    description: 'Issue priority',
  })
  priority: JiraPriority;
}
