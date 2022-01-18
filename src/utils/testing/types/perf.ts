import { Field, ObjectType, ID } from '@nestjs/graphql';

import ResourceConnection from './resourceConnection';
import PerfRunConnection from './perfRunConnection';
import PerfRun from './perfRun';
import Platform from './platform';
import RepositoryConnection from '../../github/types/repositoryConnection'

@ObjectType()
export default class Perf {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Full document source as a JSON string',
  })
  _source: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the element being tested',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Description of the run',
  })
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'Analysis of the run, written by a team member',
  })
  analysis: string;

  @Field(() => String, {
    nullable: true,
    description: 'Who did the analysis',
  })
  analysis_by: string;  

  @Field(() => String, {
    nullable: true,
    description: 'Date the analysis was performed',
  })
  analysis_date: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Was the run verified and relevant ?',
  })
  verified: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Who verified therun',
  })
  verified_by: string;  

  @Field(() => String, {
    nullable: true,
    description: 'Date the run was verified',
  })
  verified_date: string;

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
    nullable: true,
    description: 'Execution time for the run',
  })
  duration: number;

  @Field({
    nullable: true,
    description: 'Value of a single run metric (where relevant)',
  })
  value: number;

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
    nullable: true,
    description: 'Runs executed in the tests',
  })
  runs: PerfRunConnection;

  @Field(() => PerfRun, {
    nullable: false,
    description: 'Run corresponding to the selected profile (provided using profileid)',
  })
  run: PerfRun;  

  @Field(() => String, {
    nullable: true,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Is the run disabled (removed from the records)',
  })
  disabled: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Who was the run disabled by',
  })
  disabled_by: string;

  @Field(() => String, {
    nullable: true,
    description: 'When was the run disabled',
  })
  disabled_date: string;  

}
