import { Field, ObjectType } from '@nestjs/graphql';

import JiraVersion from './version';

@ObjectType()
export default class JiraVersionEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => JiraVersion, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: JiraVersion;
}
