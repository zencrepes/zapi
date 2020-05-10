import { Field, ObjectType } from '@nestjs/graphql';

import Ref from './ref';

@ObjectType()
export default class RefEdge {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Ref, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Ref;
}
