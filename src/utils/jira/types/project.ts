import { Field, ObjectType, ID } from '@nestjs/graphql';

import JiraAvatarUrls from './avatarUrls';
import JiraProjectCategory from './projectCategory';

@ObjectType()
export default class JiraProject {
  @Field(() => ID)
  id: string;

  @Field(() => JiraAvatarUrls, {
    nullable: false,
    description: 'The project avatar URL',
  })
  avatarUrls: JiraAvatarUrls;

  @Field(() => String, {
    nullable: false,
    description: 'The project key',
  })
  key: string;

  @Field(() => String, {
    nullable: false,
    description: 'The project name',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'The Type of project',
  })
  projectTypeKey: string;

  @Field(() => JiraProjectCategory, {
    nullable: false,
    description: 'Project category',
  })
  statusCategory: JiraProjectCategory;
}
