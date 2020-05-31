import { Field, ObjectType, Int } from '@nestjs/graphql';

import Project from '../../../utils/github/types/project';

@ObjectType()
export default class DataProjectConnection {
  @Field(() => [Project], { nullable: true })
  nodes: Project[];

  @Field(() => Int)
  totalCount: number;
}
