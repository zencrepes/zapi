import { Field, ObjectType } from '@nestjs/graphql';

import VelocityMetric from './velocityMetric.type';

@ObjectType({ isAbstract: true })
export default abstract class VelocityItem {
  @Field(() => String, {
    nullable: false,
    description: 'Start',
  })
  date: string;

  @Field(() => VelocityMetric, {
    nullable: false,
    description: 'Velocity data calculated using document counts',
  })
  issues: VelocityMetric;

  @Field(() => VelocityMetric, {
    nullable: false,
    description: 'Velocity data calculated using document points',
  })
  points: VelocityMetric;
}
