import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Language {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the label color.',
  })
  color: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the label name.',
  })
  name: string;
}
