import { Field, ObjectType, Int } from '@nestjs/graphql';

import Repository from '../../../utils/github/types/repository';

@ObjectType()
export default class DataRepositoryConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [Repository], { nullable: true })
  nodes: Repository[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  totalCount: number;
}
