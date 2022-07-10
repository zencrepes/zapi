import { Field, ObjectType } from '@nestjs/graphql';

import Tag from './tag';

@ObjectType()
export default class TagEdge {
  @Field(() => Tag, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Tag;
}
