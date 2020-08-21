import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export default abstract class VelocityMetric {
  @Field(() => Number, {
    nullable: true,
    description: 'Sum of elements',
  })
  sum: number;

  @Field(() => Number, {
    nullable: true,
    description: 'Moving average',
  })
  moving: number;
}
