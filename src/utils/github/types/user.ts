import { Field, ObjectType, ID } from '@nestjs/graphql';
import Repository from './repository';
import FollowerConnection from './followerConnection';
import FollowingConnection from './followingConnection';
import OrganizationConnection from './organizationConnection';
import RepositoryConnection from './repositoryConnection';

@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field(() => String, {
    nullable: false,
    description: 'The username of the actor.',
  })
  login: string;

  @Field(() => String, {
    nullable: true,
    description: 'The user public profile company..',
  })
  company: string;

  @Field(() => String, {
    nullable: true,
    description: 'A URL pointing to the actor public avatar.',
  })
  avatarUrl: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this actor.',
  })
  url: string;

  @Field(() => String, {
    nullable: true,
    description: 'The user public profile name.',
  })
  name: string;

  @Field(() => Repository, {
    nullable: true,
    description: 'If Watcher or Stargazer, the target repository',
  })
  repository?: string;

  @Field(() => String, {
    nullable: true,
    description: 'If Watcher or Stargazer, the data type (watchers or stargazers)',
  })
  dataType?: string;

  @Field(() => String, {
    nullable: true,
    description: 'If Stargazer, the date and time when an object was last starred.',
  })
  lastStarredAt?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not this user is a GitHub employee.',
  })
  isEmployee: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not the user has marked themselves as for hire.',
  })
  isHireable: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not this user is a GitHub Developer Program member.',
  })
  isDeveloperProgramMember: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not this user is a participant in the GitHub Campus Experts Program.',
  })
  isCampusExpert: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether or not this user is a participant in the GitHub Security Bug Bounty.',
  })
  isBountyHunter: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'A URL pointing to the user public website/ blog.',
  })
  websiteUrl: boolean;

  @Field(() => FollowerConnection, {
    nullable: true,
    description: 'A list of users the given user is followed by.',
  })
  followers: FollowerConnection;

  @Field(() => FollowingConnection, {
    nullable: true,
    description: 'A list of users the given user is following.',
  })
  following: FollowingConnection;

  @Field(() => OrganizationConnection, {
    nullable: true,
    description: 'A list of organizations the given user is a member of.',
  })
  organizations: OrganizationConnection;

  @Field(() => RepositoryConnection, {
    nullable: true,
    description: 'A list of repositories watched or starred by the user',
  })
  repositories: RepositoryConnection;
}
