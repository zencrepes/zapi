import { Field, ObjectType } from '@nestjs/graphql';

import Dependency from './dependency';

@ObjectType()
export default class DependencyEdge {
  @Field(() => Dependency, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Dependency;
}
