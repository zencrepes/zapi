import { Field, ObjectType, Int } from '@nestjs/graphql';

import User from '../../../utils/github/types/user';

@ObjectType()
export default class WatcherConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [User], { nullable: true })
  nodes: User[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  totalCount: number;
}
