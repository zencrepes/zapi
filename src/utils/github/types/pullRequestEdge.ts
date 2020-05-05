import { Field, ObjectType } from '@nestjs/graphql';

import Pullrequest from './pullRequest';

@ObjectType()
export default class PullrequestEdge {
  @Field(() => Pullrequest, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Pullrequest;
}
