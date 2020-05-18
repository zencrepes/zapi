import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ConfigTableColumns {
  @Field({
    nullable: true,
    description: 'Displayable name for the column',
  })
  name: string;

  @Field({
    nullable: true,
    description: 'Field used to fetch the column content',
  })
  field: string;

  @Field({
    nullable: true,
    description: 'Field to sort upon for the column (could be different)',
  })
  sortField: string;

  @Field({
    nullable: true,
    description: 'Should the column be sortable',
  })
  sortable: boolean;
}
