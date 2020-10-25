import { Field, ObjectType, Int } from '@nestjs/graphql';

import State from '../../../utils/testing/types/state';

@ObjectType()
export default class DataStateConnection {
  @Field(() => [State], { nullable: true })
  nodes: State[];

  @Field(() => Int)
  totalCount: number;
}
