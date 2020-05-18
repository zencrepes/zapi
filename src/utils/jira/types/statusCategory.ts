import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraStatusCategory {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Key of the category',
  })
  key: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the color (non hex)',
  })
  colorName: string;

  @Field(() => String, {
    nullable: false,
    description: 'Category name',
  })
  name: string;
}
