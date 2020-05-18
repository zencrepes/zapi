import { Field, ObjectType, Int } from '@nestjs/graphql';

import Pipeline from '../../../utils/circleci/types/pipeline';

@ObjectType()
export default class CircleciPipelineItemConnection {
  @Field(() => [Pipeline], { nullable: true })
  nodes: Pipeline[];

  @Field(() => Int)
  totalCount: number;
}
