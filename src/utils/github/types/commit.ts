import { Field, ObjectType, ID } from '@nestjs/graphql';

import CommitHistoryConnection from './commitHistoryConnection';
import GitActor from './gitActor';

@ObjectType()
export default class Commit {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'The datetime when this commit was pushed.',
  })
  pushedDate: string;

  @Field(() => String, {
    nullable: true,
    description: 'The Git commit message headline',
  })
  messageHeadline: string;

  @Field(() => CommitHistoryConnection, {
    nullable: true,
    description: 'The linear commit history starting from (and including) this commit, in the same order as `git log`',
  })
  history: CommitHistoryConnection;

  @Field(() => GitActor, {
    nullable: true,
    description: 'Authorship details of the commit.',
  })
  author: GitActor;
}
