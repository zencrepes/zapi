import { Field, ObjectType, Int } from '@nestjs/graphql';

import BambooRun from '../../../utils/bamboo/types/run';

@ObjectType()
export default class DataRunConnection {
  @Field(() => [BambooRun], { nullable: true })
  nodes: BambooRun[];

  @Field(() => Int)
  totalCount: number;
}
