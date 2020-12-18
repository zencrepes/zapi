import { Field, ObjectType, ID } from '@nestjs/graphql';

import BambooPlan from './plan';

@ObjectType()
export default class BambooRun {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The key of the run',
  })
  key: string;

  @Field(() => BambooPlan, {
    nullable: false,
    description: 'Bamboo plan attached to the run',
  })
  plan: BambooPlan;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the run was started',
  })
  startedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'Date at which the run was completed',
  })
  completedAt: string;  

  @Field(() => String, {
    nullable: false,
    description: 'Name of the run',
  })
  name: string;

  @Field({
    nullable: false,
    description: 'Number of the run',
  })
  number: number;

  @Field({
    nullable: false,
    description: 'Duration of the run in seconds',
  })
  duration: number;  
  
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
    description: 'Total number of skipped tests in the run',
  })
  runSkipped: number;

  @Field({
    nullable: false,
    description: 'Total number of quarantined tests in the run',
  })
  runQuarantined: number;    

  @Field(() => String, {
    nullable: false,
    description: 'State of the run',
  })
  state: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Was the run successful',
  })
  successful: boolean;

}
