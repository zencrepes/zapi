import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class AggregationBucket {
  @Field({
    nullable: false,
    description: 'The Bucket key',
  })
  key: string;

  @Field({
    nullable: true,
    description: 'Representation of the key as a string (useful for dates)',
  })
  keyAsString: string;

  @Field({
    nullable: false,
    description: 'The number of elements in the bucket',
  })
  docCount: number;

  @Field({
    nullable: true,
    description: 'Moving average value',
  })
  docCountMovingAvg: number;

  @Field({
    nullable: true,
    description: 'Metadata returned based on the aggOptions parameter, it allows additional fields to be returned',
  })
  metadata: string;
}