import { Field, ObjectType } from '@nestjs/graphql';

import VscCommit from './vcsCommit';

@ObjectType()
export default class Vcs {
  @Field(() => String, {
    nullable: false,
    description: 'Origin repository url',
  })
  origin_repository_url: string;

  @Field(() => String, {
    nullable: false,
    description: 'Target repository url',
  })
  target_repository_url: string;

  @Field(() => String, {
    nullable: false,
    description: 'Revision hash',
  })
  revision: string;

  @Field(() => String, {
    nullable: false,
    description: 'Provider Name',
  })
  provider_name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Branch on the repository',
  })
  branch: string;

  @Field(() => VscCommit, {
    nullable: true,
    description: 'Commit that triggered the pipeline',
  })
  commit: VscCommit;
}
