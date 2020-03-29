import { Field, InputType } from 'type-graphql';
import { Order } from '../../../utils/order/order';
import { registerEnumType } from 'type-graphql';

export enum ItemOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
  state = 'state',
}

registerEnumType(ItemOrderField, {
  name: 'ItemOrderField',
  description: 'Properties by which issues connections can be ordered.',
});

@InputType()
export default class ItemOrder extends Order {
  @Field(type => ItemOrderField)
  field: ItemOrderField;
}
