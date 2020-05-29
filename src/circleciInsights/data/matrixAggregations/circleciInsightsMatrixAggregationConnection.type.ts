import { Field, ObjectType, Int } from '@nestjs/graphql';

import AggregationConnection from '../../../utils/data/aggregations/aggregationConnection.type';

@ObjectType()
export default class CirclecInsightsMatrixAggregationsConnection {
  @Field(() => [AggregationConnection], { nullable: true })
  nodes: AggregationConnection[];

  @Field(() => String)
  compareField: string;

  @Field(() => Int)
  totalCount: number;
}
