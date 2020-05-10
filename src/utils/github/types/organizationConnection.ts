import { Field, ObjectType, Int } from '@nestjs/graphql';

import OrganizationEdge from './organizationEdge';

@ObjectType()
export default class OrganizationConnection {
  @Field(() => [OrganizationEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: OrganizationEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
