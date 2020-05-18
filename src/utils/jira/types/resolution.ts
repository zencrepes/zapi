import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraResolution {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Description of the resolution',
  })
  description: string;

  @Field(() => String, {
    nullable: false,
    description: 'Resolution name',
  })
  name: string;
}
