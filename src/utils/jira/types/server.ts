import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class JiraServer {
  @Field(() => String, {
    nullable: false,
    description: 'Jira Server name',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'URL to reach Jira server host',
  })
  host: string;
}
