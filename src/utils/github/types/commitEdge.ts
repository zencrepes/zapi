import { Field, ObjectType } from '@nestjs/graphql';

import Commit from './commit';

@ObjectType()
export default class CommitEdge {
  @Field(() => Commit, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Commit;
}
