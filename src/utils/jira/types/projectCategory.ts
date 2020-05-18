import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraProjectCategory {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Description of the category',
  })
  description: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the category',
  })
  name: string;
}
