import { Field, ObjectType } from '@nestjs/graphql';

import ConfigAggregation from './aggregation.type';

@ObjectType()
export default class ConfigAggregations {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Number, {
    nullable: false,
    description: 'Total count of elements',
  })
  totalCount: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [ConfigAggregation], {
    nullable: false,
    description: 'A list of available datasets',
  })
  nodes: ConfigAggregation[];
}
