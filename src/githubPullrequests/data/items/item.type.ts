import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Item {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  id: string;

  @Field({
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt?: string;

  @Field({
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String)
  state: string;
}
