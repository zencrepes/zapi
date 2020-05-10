import { Field, ObjectType } from '@nestjs/graphql';

import Label from './label';

@ObjectType()
export default class LabelEdge {
  @Field(() => Label, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Label;
}
