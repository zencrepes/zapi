import { Field, ObjectType, ID } from '@nestjs/graphql';

import Topic from './topic';

@ObjectType()
export default class RepositoryTopic {
  @Field(() => ID)
  id: string;

  @Field(() => Topic, {
    nullable: false,
    description: 'The topic.',
  })
  topic: Topic;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this repository-topic.',
  })
  url: string;
}
