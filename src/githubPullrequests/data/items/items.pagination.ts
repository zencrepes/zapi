import { Field, ObjectType, Int } from '@nestjs/graphql';

import Pullrequest from '../../../utils/github/types/pullrequest';

@ObjectType()
export default class ItemConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [Pullrequest], { nullable: true })
  nodes: Array<Pullrequest>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  totalCount: number;
}
