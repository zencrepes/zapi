import { Field, ObjectType } from '@nestjs/graphql';

import JiraAvatarUrls from './avatarUrls';

@ObjectType()
export default class JiraUser {
  @Field(() => String, {
    nullable: false,
    description: 'Jira Key',
  })
  key: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Whether the assignee account is active or not',
  })
  active: boolean;

  @Field(() => JiraAvatarUrls, {
    nullable: false,
    description: 'The assignee avatar URL',
  })
  avatarUrls: JiraAvatarUrls;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the assignee display name',
  })
  displayName: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the assignee display email address',
  })
  emailAddress: string;

  @Field(() => String, {
    nullable: true,
    description: 'The assignee name',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'The assignee timezone',
  })
  timeZone: string;
}
