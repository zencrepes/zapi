import { Field, ObjectType, ID, Int } from 'type-graphql';

@ObjectType()
export default class Label {
  @Field(type => ID)
  id: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the label color.',
  })
  color: string;

  @Field(type => String, {
    nullable: false,
    description: 'Identifies the label name.',
  })
  name: string;

  @Field(type => String, {
    nullable: true,
    description: 'A brief description of this label.',
  })
  description: string;
}
