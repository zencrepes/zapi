import { Field, ObjectType } from '@nestjs/graphql';

import AggregationBucket from './aggregationBucket.type';

@ObjectType({ isAbstract: true })
export default abstract class AggregationConnection {
  @Field(() => String, {
    nullable: false,
    description: 'The field that was aggregated on',
  })
  field: string;

  @Field(() => String, {
    nullable: true,
    description: 'When running a matrix aggregation, the field that was used for the comparison',
  })
  compareField: string;

  @Field(() => String, {
    nullable: true,
    description: 'When running a matrix aggregation, the value of the field that was used for the comparison',
  })
  compareValue: string;

  @Field(() => [AggregationBucket], {
    nullable: false,
    description: 'A list of aggregation buckets',
  })
  buckets: AggregationBucket[];
}
