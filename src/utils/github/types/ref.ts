import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Ref {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The ref name.',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'The ref prefix, such as `refs/heads/` or`refs/tags/`.',
  })
  prefix: string;
}
