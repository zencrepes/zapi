import { Field, ObjectType, ID } from '@nestjs/graphql';

import NetworkNodeData from './networkNodeData.type';

@ObjectType()
export default class IssueNetworkNode {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Cytoscape group (either nodes or edges',
  })
  group: string;

  @Field(() => String, {
    nullable: true,
    description: 'Cytoscape node label',
  })
  label: string;

  @Field(() => NetworkNodeData, {
    nullable: true,
    description: 'Cytoscape node data',
  })
  data: NetworkNodeData;
}
