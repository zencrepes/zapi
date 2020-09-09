import { ID, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ConfigTableColumns {
  @Field(() => ID)
  id: string;

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
    description: 'If the field is an array, the object index to use to fetch content',
  })
  subfield: string;

  @Field({
    nullable: true,
    description: 'Type of field being returned (date, string, boolean, url, array, ...)',
  })
  fieldType: string;

  @Field({
    nullable: true,
    description: 'If the field is an array of objects, path to the node to be used',
  })
  fieldNode: string;

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

  @Field({
    nullable: true,
    description: 'Link attached to the field',
  })
  linkField: string;

  @Field({
    nullable: true,
    description: 'Should the column be displayed by default',
  })
  default: boolean;
}
