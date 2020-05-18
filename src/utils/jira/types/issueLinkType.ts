import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraIssueLinkType {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the link',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the inward link',
  })
  inward: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the outward link',
  })
  outward: string;
}
