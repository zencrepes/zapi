import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class DataMetrics {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => String, {
    nullable: false,
    description: 'The filed that was aggregated on',
  })
  field: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Minimum value for the current query',
  })
  min: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Maximum value for the current query',
  })
  max: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Overall minimum value (current query with field excluded)',
  })
  overallMin: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Overall maximum value (current query with field excluded)',
  })
  overallMax: string;
}
