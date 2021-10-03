import { Field, ObjectType, ID } from '@nestjs/graphql';

import Statistics from './statistics'

@ObjectType()
export default class PerfRun {
  @Field(() => ID, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the run',
  })
  name: string;

  @Field({
    nullable: true,
    description: 'Number of users used for the run',
  })
  userCount: number;   

  @Field(() => [Statistics], {
    nullable: false,
    description: 'Statistics coming from JMeter statistics.json file',
  })
  statistics: Statistics[];

}
