import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class DataMetrics {
  @Field(type => String, {
    nullable: false,
    description: 'The filed that was aggregated on',
  })
  field: string;

  @Field(type => Number, {
    nullable: false,
    description: 'Minimum value for the current query',
  })
  min: string;

  @Field(type => Number, {
    nullable: false,
    description: 'Maximum value for the current query',
  })
  max: string;

  @Field(type => Number, {
    nullable: false,
    description: 'Overall minimum value (current query with field excluded)',
  })
  overallMin: string;

  @Field(type => Number, {
    nullable: false,
    description: 'Overall maximum value (current query with field excluded)',
  })
  overallMax: string;
}
