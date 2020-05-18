import { Field, ObjectType, Int } from '@nestjs/graphql';

import JiraVersionEdge from './versionEdge';

@ObjectType()
export default class JiraVersionConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [JiraVersionEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: JiraVersionEdge[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
