import { Field, ObjectType, ID } from '@nestjs/graphql';

import ReferencedSubject from './referencedSubject';
import Actor from './actor';

@ObjectType()
export default class CrossReferencedEvent {
  @Field(() => ID)
  id: string;

  @Field(() => Actor, {
    nullable: false,
    description: 'The actor who authored the reference',
  })
  author: Actor;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies when the reference was made.',
  })
  referencedAt: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Reference originated in a different repository.',
  })
  isCrossRepository: boolean;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP path for this pull request.',
  })
  resourcePath: string;

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this node.',
  })
  url: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Checks if the target will be closed when the source is merged.',
  })
  willCloseTarget: boolean;

  @Field(() => ReferencedSubject, {
    nullable: false,
    description: 'Issue or pull request that made the reference.',
  })
  source: ReferencedSubject;

  @Field(() => ReferencedSubject, {
    nullable: false,
    description: ' Issue or pull request to which the reference was made.',
  })
  target: ReferencedSubject;
}
