import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraIssueType {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the type',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Description of the type',
  })
  description: string;

  @Field(() => String, {
    nullable: false,
    description: 'Icon of the type',
  })
  iconUrl: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is it a subtask',
  })
  subtask: boolean;
}
