import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class BambooProject {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the project',
  })
  name: string;

}
