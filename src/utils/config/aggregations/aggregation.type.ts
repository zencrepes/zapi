import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ConfigAggregation {
  @Field(() => ID)
  id: string;

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
    description: 'Value to display if field is null (or _EMPTY_)',
  })
  nullValue: string;

  @Field({
    nullable: true,
    description: 'Stringified filter to be applied if user clicks on nullValue',
  })
  nullFilter: string;

  @Field({
    nullable: true,
    description: 'Should the aggregation be displayed by default',
  })
  default: boolean;
}
