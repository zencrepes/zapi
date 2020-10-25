import { Field, ObjectType, ID } from '@nestjs/graphql';

import DependencyConnection from './dependencyConnection';

@ObjectType()
export default class State {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the state event was recorded (last)',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the element being tested',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Version of the element being tested',
  })
  version: string;

  @Field(() => String, {
    nullable: false,
    description: 'Concatenated name and version, separated with a _',
  })
  full: string;

  @Field(() => DependencyConnection, {
    nullable: false,
    description: 'List of dependencyes to the element being tested',
  })
  dependencies: DependencyConnection;

  @Field(() => String, {
    nullable: false,
    description: 'State of the test execution (PASS, FAIL, ...)',
  })
  state: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;

  @Field({
    nullable: false,
    description: 'Total number of tests in the run',
  })
  runTotal: number;

  @Field({
    nullable: false,
    description: 'Total number of successful tests in the run',
  })
  runSuccess: number;

  @Field({
    nullable: false,
    description: 'Total number of failed tests in the run',
  })
  runFailure: number;
  
  @Field({
    nullable: false,
    description: 'Total duration of the run',
  })
  runDuration: number;
}
