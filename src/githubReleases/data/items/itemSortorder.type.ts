import { Field, InputType } from '@nestjs/graphql';
import { Order } from '../../../utils/data/items/order.type';
import { registerEnumType } from '@nestjs/graphql';

export enum ItemSortorderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(ItemSortorderField, {
  name: 'ItemOrderField',
  description: 'Properties by which issues connections can be ordered.',
});

@InputType()
export default class ReleasesSortorder extends Order {
  @Field({
    nullable: true,
    description: 'Order field (see config aggregations node for a sample of possible values)',
  })
  field: string;
}
