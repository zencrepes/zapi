import { Field, ObjectType } from '@nestjs/graphql';

import AggregationBucket from './aggregationBucket.type';

@ObjectType({ isAbstract: true })
export default abstract class AggregationConnection {
  @Field(() => String, {
    nullable: false,
    description: 'The field that was aggregated on',
  })
  field: string;

  @Field(() => [AggregationBucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: AggregationBucket[];
}
