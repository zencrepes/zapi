import { Field, ObjectType, ID } from '@nestjs/graphql';

import Commit from './commit';

@ObjectType()
export default class Ref {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'The ref name.',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'The ref prefix, such as `refs/heads/` or`refs/tags/`.',
  })
  prefix: string;

  @Field(() => Commit, {
    nullable: true,
    description: 'The commit the ref points to',
  })
  target: string;
}
