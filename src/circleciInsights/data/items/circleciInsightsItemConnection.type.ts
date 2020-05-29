import { Field, ObjectType, Int } from '@nestjs/graphql';

import CircleciJobRun from '../../../utils/circleci/types/jobRun';

@ObjectType()
export default class CircleciJobsWorkflowRunItemConnection {
  @Field(() => [CircleciJobRun], { nullable: true })
  nodes: CircleciJobRun[];

  @Field(() => Int)
  totalCount: number;
}
