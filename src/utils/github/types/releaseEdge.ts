import { Field, ObjectType } from '@nestjs/graphql';

import Release from './release';

@ObjectType()
export default class ReleaseEdge {
  @Field(() => Release, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Release;
}
