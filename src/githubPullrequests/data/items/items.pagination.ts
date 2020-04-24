import { Field, ObjectType, Int } from '@nestjs/graphql';

import Pullrequest from '../../../utils/github/types/pullrequest';

@ObjectType()
export default class ItemConnection {
  @Field(type => [Pullrequest], { nullable: true })
  nodes: Array<Pullrequest>;

  @Field(type => Int)
  totalCount: number;
}
