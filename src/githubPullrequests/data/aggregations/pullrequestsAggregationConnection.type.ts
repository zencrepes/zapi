import { ObjectType } from '@nestjs/graphql';

import AggregationConnection from '../../../utils/data/aggregations/aggregationConnection.type';

@ObjectType()
export default class PullrequestsAggregationConnection extends AggregationConnection {}
