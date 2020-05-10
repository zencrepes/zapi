import { Field, ObjectType } from '@nestjs/graphql';

import Repository from './repository';

@ObjectType()
export default class RepositoryEdge {
  @Field(() => Repository, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Repository;
}
