import { Field, ObjectType, ID } from '@nestjs/graphql';

import DependencyConnection from './dependencyConnection';

@ObjectType()
export default class TestingCase {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the state event was recorded (last)',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the test case being executed',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the project in which the test case is being executed',
  })
  project: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the test suite containing that the test case',
  })
  suite: string;

  @Field(() => String, {
    nullable: false,
    description: 'Jahia version used during the test',
  })
  jahia: string;

  @Field(() => String, {
    nullable: false,
    description: 'Jahia module used during the test',
  })
  module: string;

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
    description: 'Total duration of the test case',
  })
  duration: number;
}
