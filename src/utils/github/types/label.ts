import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Label {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the label color.',
  })
  color: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'Identifies the label name.',
  })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: true,
    description: 'A brief description of this label.',
  })
  description: string;
}
