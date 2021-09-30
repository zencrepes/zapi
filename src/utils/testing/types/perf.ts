import { Field, ObjectType, ID } from '@nestjs/graphql';

import DependencyConnection from './dependencyConnection';
import Platform from './platform';
import RepositoryConnection from '../../github/types/repositoryConnection'

@ObjectType()
export default class Perf {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the element being tested',
  })
  name: string;

  @Field(() => RepositoryConnection, {
    nullable: false,
    description: 'List of dependencyes to the element being tested',
  })
  repository: RepositoryConnection;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the performance run was started',
  })
  startedAt: string;

  @Field({
    nullable: false,
    description: 'Execution time for the run',
  })
  duration: number;

  @Field(() => Platform, {
    nullable: false,
    description: 'List of dependencyes to the element being tested',
  })
  platform: Platform;

  @Field(() => DependencyConnection, {
    nullable: false,
    description: 'List of dependencyes to the element being tested',
  })
  dependencies: DependencyConnection;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

}
