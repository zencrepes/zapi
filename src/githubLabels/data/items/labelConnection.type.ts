import { Field, ObjectType, Int } from '@nestjs/graphql';

import Label from '../../../utils/github/types/label';

@ObjectType()
export default class DataLabelConnection {
  @Field(() => [Label], { nullable: true })
  nodes: Label[];

  @Field(() => Int)
  totalCount: number;
}
