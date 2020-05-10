import { Field, ObjectType } from '@nestjs/graphql';

import RepositoryTopic from './repositoryTopic';

@ObjectType()
export default class RepositoryTopicEdge {
  @Field(() => RepositoryTopic, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: RepositoryTopic;
}
