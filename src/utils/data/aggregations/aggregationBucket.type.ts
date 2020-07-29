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
    nullable: false,
    description: 'The count associated with the bucket',
  })
  count: number;

  @Field({
    nullable: true,
    description: 'Metadata returned based on the aggOptions parameter, it allows additional fields to be returned',
  })
  metadata: string;

  @Field({
    nullable: true,
    description: 'Sum value of all sumField in the date histogram',
  })
  sum: number;

  @Field({
    nullable: true,
    description: 'Avg value of all avgField in the date histogram',
  })
  avg: number;

  @Field({
    nullable: true,
    description: 'Count of documents within a moving aggregation',
  })
  moving: number;
}
