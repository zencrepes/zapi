import { Field, ObjectType } from '@nestjs/graphql';

import ConfigTableColumns from './tableColumns.type';

@ObjectType()
export default class ConfigTable {
  @Field(() => String, {
    nullable: true,
    description: 'The type of item available in the table',
  })
  itemsType: string;

  @Field(() => [ConfigTableColumns], {
    nullable: false,
    description: 'A list of available columns',
  })
  columns: ConfigTableColumns[];
}
