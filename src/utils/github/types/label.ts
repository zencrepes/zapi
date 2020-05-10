import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Label {
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

  @Field(() => String, {
    nullable: true,
    description: 'A brief description of this label.',
  })
  description: string;
}
