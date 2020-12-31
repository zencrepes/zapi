import { Field, ObjectType } from '@nestjs/graphql';

import FailureRateBucketDate from './failurerateBucketDate.type';

@ObjectType()
export default class FailureRateBucket {
  @Field({
    nullable: false,
    description: 'The Bucket key',
  })
  key: string;

  @Field({
    nullable: false,
    description: 'The number of elements in the bucket',
  })
  docCount: number;

  @Field({
    nullable: true,
    description: 'Representation of the key as a string (useful for dates)',
  })
  keyAsString: string;

  @Field({
    nullable: false,
    description: 'The failure rate (in %) over the entire period',
  })
  runFailureRate: number;

  @Field({
    nullable: true,
    description: 'The total number of tests that were executed',
  })
  runTotal: number;  

  @Field({
    nullable: true,
    description: 'The average number of tests that were executed per run',
  })
  runTotalAvg: number;    

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [FailureRateBucketDate], {
    nullable: false,
    description: 'Breakdown of the dataset per the defined interval',
  })
  buckets: FailureRateBucketDate[];
}
