import { Field, ObjectType, Int } from '@nestjs/graphql';

import IssueNetworkNode from './networkNode.type';

@ObjectType()
export default class IssueNetwork {
  @Field(() => [IssueNetworkNode], { nullable: true })
  nodes: IssueNetworkNode[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Time it took for ZenCrepes API to process the request (in ms)',
  })
  processTime: number;

  @Field(() => String, {
    nullable: true,
    description: 'Source used for the root nodes (query or selected Ids)',
  })
  source: string;
}
