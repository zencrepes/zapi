import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Dependency {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the dependency',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Version of the dependency',
  })
  version: string;  

  @Field(() => String, {
    nullable: false,
    description: 'Concatenated name and version, separated with a _',
  })
  full: string;

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

}
