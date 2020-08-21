import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

import RepositoryOwner from './repositoryOwner';
import BranchProtectionRuleConnection from './branchProtectionRuleConnection';
import CodeOfConduct from './codeOfConduct';
import Ref from './ref';
import IssueConnection from './issueConnection';
import LabelConnection from './labelConnection';
import LanguageConnection from './languageConnection';
import Language from './language';
import License from './license';
import MilestoneConnection from './milestoneConnection';
import ProjectConnection from './projectConnection';
import PullRequestConnection from './pullRequestConnection';
import RefConnection from './refConnection';
import ReleaseConnection from './releaseConnection';
import RepositoryTopicConnection from './repositoryTopicConnection';
import StargazerConnection from './stargazerConnection';
import RepositoryVulnerabilityAlertConnection from './repositoryVulnerabilityAlertConnection';
import UserConnection from './userConnection';

@ObjectType()
export default class Repository {
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

  @Field(() => BranchProtectionRuleConnection, {
    nullable: true,
    description: 'The User owner of the repository.',
  })
  branchProtectionRules: BranchProtectionRuleConnection;

  @Field(() => CodeOfConduct, {
    nullable: true,
    description: 'The User owner of the repository.',
  })
  codeOfConduct: CodeOfConduct;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was starred by a user.',
  })
  starredAt?: string;

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

  @Field(() => Int, {
    nullable: true,
    description: 'The number of kilobytes this repository occupies on disk.',
  })
  diskUsage: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Returns how many forks there are of this repository in the whole network.',
  })
  forkCount: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the repository has issues feature enabled.',
  })
  hasIssuesEnabled: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the repository has projects feature enabled.',
  })
  hasProjectsEnabled: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the repository has wiki feature enabled.',
  })
  hasWikiEnabled: boolean;

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
    description: 'Indicates if the repository has been locked or not.',
  })
  isLocked: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository is a mirror.',
  })
  isMirror: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository is private.',
  })
  isPrivate: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Identifies if the repository is a template that can be used to generate new repositories.',
  })
  isTemplate: boolean;

  @Field(() => IssueConnection, {
    nullable: true,
    description: 'A list of issues that have been opened in the repository.',
  })
  issues: IssueConnection;

  @Field(() => LabelConnection, {
    nullable: true,
    description: 'A list of labels associated with the repository.',
  })
  labels: LabelConnection;

  @Field(() => LanguageConnection, {
    nullable: true,
    description: 'A list of labels associated with the repository.',
  })
  languages: LanguageConnection;

  @Field(() => License, {
    nullable: true,
    description: 'The license associated with the repository',
  })
  licenseInfo: License;

  @Field(() => MilestoneConnection, {
    nullable: true,
    description: 'A list of milestones associated with the repository.',
  })
  milestones: MilestoneConnection;

  @Field(() => ProjectConnection, {
    nullable: true,
    description: 'A list of milestones associated with the repository.',
  })
  projects: ProjectConnection;

  @Field(() => Language, {
    nullable: true,
    description: 'The primary language of the repository code.',
  })
  primaryLanguage: Language;

  @Field(() => PullRequestConnection, {
    nullable: true,
    description: 'A list of pull requests that have been opened in the repository.',
  })
  pullRequests: PullRequestConnection;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies when the repository was last pushed to.',
  })
  pushedAt: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not rebase-merging is enabled on this repository.',
  })
  rebaseMergeAllowed: boolean;

  @Field(() => RefConnection, {
    nullable: true,
    description: 'Whether or not rebase-merging is enabled on this repository.',
  })
  refs: RefConnection;

  @Field(() => Ref, {
    nullable: true,
    description: 'Link to the ref containing recent commits to master',
  })
  recentCommitsMaster: Ref;

  @Field(() => ReleaseConnection, {
    nullable: true,
    description: 'A list of pull requests that have been opened in the repository.',
  })
  releases: ReleaseConnection;

  @Field(() => RepositoryTopicConnection, {
    nullable: true,
    description: 'A list of applied repository-topic associations for this repository.',
  })
  repositoryTopics: RepositoryTopicConnection;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not squash-merging is enabled on this repository.',
  })
  squashMergeAllowed: boolean;

  @Field(() => Number, {
    nullable: true,
    description: 'Number of commits pushed to master during the current year (up to 10)',
  })
  currentYearMasterCommits: boolean;

  @Field(() => StargazerConnection, {
    nullable: true,
    description: 'A list of users who have starred this starrable.',
  })
  stargazers: StargazerConnection;

  @Field(() => Repository, {
    nullable: true,
    description: 'The repository from which this repository was generated, if any.',
  })
  templateRepository: Repository;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(() => RepositoryVulnerabilityAlertConnection, {
    nullable: true,
    description: 'A list of vulnerability alerts that are on this repository.',
  })
  vulnerabilityAlerts: RepositoryVulnerabilityAlertConnection;

  @Field(() => UserConnection, {
    nullable: true,
    description: 'A list of vulnerability alerts that are on this repository.',
  })
  watchers: UserConnection;
}
