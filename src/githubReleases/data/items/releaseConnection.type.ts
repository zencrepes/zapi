import { Field, ObjectType, Int } from '@nestjs/graphql';

import Release from '../../../utils/github/types/release';

@ObjectType()
export default class DataReleaseConnection {
  @Field(() => [Release], { nullable: true })
  nodes: Release[];

  @Field(() => Int)
  totalCount: number;
}
