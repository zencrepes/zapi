import { Field, InputType } from '@nestjs/graphql';
import { Order } from '../../../utils/order/order';
import { registerEnumType } from '@nestjs/graphql';

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
  @Field({
    nullable: true,
    description:
      'Order field (see config aggregations node for a sample of possible values)',
  })
  field: string;
}
