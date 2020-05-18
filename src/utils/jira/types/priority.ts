import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraPriority {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Priority name',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Priority icon',
  })
  iconUrl: string;
}
