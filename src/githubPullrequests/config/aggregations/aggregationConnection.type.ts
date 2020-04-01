import { Field, ObjectType, ClassType, Int } from 'type-graphql';

import ConfigAggregation from './aggregation.type';

@ObjectType()
export default class ConfigAggregationsConnection {
  @Field(type => [ConfigAggregation], {
    nullable: false,
    description: 'A list of edges.',
  })
  nodes: ConfigAggregation[];

  @Field(type => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: number;
}
