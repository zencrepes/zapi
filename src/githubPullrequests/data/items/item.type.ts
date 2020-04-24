import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Item {
  @Field(type => ID)
  id: string;

  @Field({
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field({
    nullable: false,
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field({
    nullable: true,
    description: 'Identifies the date and time when the object was created.',
  })
  closedAt?: string;

  @Field({
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(type => String)
  state: string;
}
