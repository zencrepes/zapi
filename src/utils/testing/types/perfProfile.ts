import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class PerfProfile {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the profile',
  })
  name: string;
}
