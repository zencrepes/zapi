import { Field, ObjectType, ClassType, Int } from 'type-graphql';

import ConfigAggregation from './aggregation.type';

@ObjectType()
export default class ConfigAggregations {
  @Field(type => Number, {
    nullable: false,
    description: 'Total count of elements',
  })
  totalCount: number;

  @Field(type => [ConfigAggregation], {
    nullable: false,
    description: 'A list of available datasets',
  })
  nodes: ConfigAggregation[];
}
