import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class FailureRateCasesBucketDate {
  @Field({
    nullable: false,
    description: 'Start date of each bucket depending of the set interval',
  })
  dateStart: string;

  @Field({
    nullable: false,
    description: 'The number of documents that week',
  })
  docCount: number;

  @Field({
    nullable: false,
    description: 'The failure rate (in %) over the bucket window',
  })
  caseFailureRate: number;

  @Field({
    nullable: false,
    description: 'The total number of tests that were executed',
  })
  caseTotal: number;  

  @Field({
    nullable: true,
    description: 'The average number of tests that were executed per case',
  })
  caseTotalAvg: number;      
}
