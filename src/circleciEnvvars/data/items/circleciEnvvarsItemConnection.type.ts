import { Field, ObjectType, Int } from '@nestjs/graphql';

import Envvar from '../../../utils/circleci/types/envvar';

@ObjectType()
export default class CircleciEnvvarItemConnection {
  @Field(() => [Envvar], { nullable: true })
  nodes: Envvar[];

  @Field(() => Int)
  totalCount: number;
}
