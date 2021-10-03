import { Field, ObjectType, ID } from '@nestjs/graphql';

import ResourceConnection from './resourceConnection';
import PerfRunConnection from './perfRunConnection';
import Platform from './platform';
import RepositoryConnection from '../../github/types/repositoryConnection'

@ObjectType()
export default class Perf {
  @Field(() => ID, {
    nullable: true,
  })
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

  @Field({
    nullable: true,
    description: 'Rampup used for the run',
  })
  rampUp: number; 

  @Field(() => Platform, {
    nullable: false,
    description: 'Platform used to run the tests',
  })
  platform: Platform;

  @Field(() => ResourceConnection, {
    nullable: false,
    description: 'List of resources to the element being tested',
  })
  resources: ResourceConnection;

  @Field(() => PerfRunConnection, {
    nullable: false,
    description: 'Runs executed in the tests',
  })
  runs: PerfRunConnection;

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

}
