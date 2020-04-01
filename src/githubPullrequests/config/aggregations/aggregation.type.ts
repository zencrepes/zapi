import { Field, ObjectType, ID, registerEnumType } from 'type-graphql';

@ObjectType()
export default class ConfigAggregation {
  @Field({
    nullable: false,
    description: 'Actual field that can be aggregated upon',
  })
  field: string;

  @Field({
    nullable: true,
    description: 'Type of aggregation (term, date, ...)',
  })
  facetType: string;

  @Field({
    nullable: true,
    description: 'Displayable name for the aggregation',
  })
  name: string;

  @Field({
    nullable: true,
    description: 'Value to display if field is null',
  })
  nullValue: string;

  @Field({
    nullable: true,
    description: 'Should the aggregation be displayed by default',
  })
  default: boolean;
}
