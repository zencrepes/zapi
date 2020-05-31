import { Field, ObjectType, ID } from '@nestjs/graphql';

import Actor from './actor';
import Repository from './repository';

@ObjectType()
export default class Release {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was published.',
  })
  publishedAt?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Name of the release',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Tag Name of the release',
  })
  tagName: string;

  @Field(() => String, {
    nullable: false,
    description: 'Description of the release',
  })
  description: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the release is a draft',
  })
  isDraft: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Indicates if the release is a pre-release',
  })
  isPrerelease: boolean;

  @Field(() => Actor, {
    nullable: false,
    description: 'The actor who authored the comment.',
  })
  author: Actor;

  @Field(() => Repository, {
    nullable: false,
    description: 'The repository where the PR is located',
  })
  repository: string;
}
