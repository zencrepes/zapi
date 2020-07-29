import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class IssueMetrics {
  @Field(() => String, {
    nullable: false,
    description: 'The filed that was aggregated on',
  })
  field: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Minimum value for the current query',
  })
  min: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Maximum value for the current query',
  })
  max: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Sum of all fields in the current query',
  })
  sum: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Overall minimum value (current query with field excluded)',
  })
  overallMin: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Overall maximum value (current query with field excluded)',
  })
  overallMax: string;
}
