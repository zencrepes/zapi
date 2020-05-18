import { Field, ObjectType, Int } from '@nestjs/graphql';

import JiraIssueLinkEdge from './issueLinkEdge';

@ObjectType()
export default class JiraIssueLinkConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [JiraIssueLinkEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: JiraIssueLinkEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
