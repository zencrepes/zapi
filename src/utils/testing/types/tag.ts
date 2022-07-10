import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Tag {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the tag',
  })
  name: string;
}
