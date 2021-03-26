import { Field, ObjectType, Int } from '@nestjs/graphql';

import MavenPom from '../../../utils/github/types/mavenPom';

@ObjectType()
export default class DataMavenPomConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [MavenPom], { nullable: true })
  nodes: MavenPom[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  totalCount: number;
}
