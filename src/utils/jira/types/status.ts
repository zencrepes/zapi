import { Field, ObjectType, ID } from '@nestjs/graphql';

import JiraStatusCategory from './statusCategory';

@ObjectType()
export default class JiraStatus {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Status description',
  })
  description: string;

  @Field(() => String, {
    nullable: false,
    description: 'URL to the status icon',
  })
  iconUrl: string;

  @Field(() => String, {
    nullable: false,
    description: 'Status name',
  })
  name: string;

  @Field(() => JiraStatusCategory, {
    nullable: false,
    description: 'Status category',
  })
  statusCategory: JiraStatusCategory;
}
