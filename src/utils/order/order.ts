import { Field, InputType } from '@nestjs/graphql';
import { OrderDirection } from './order-direction';

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(type => OrderDirection) // eslint-disable-line @typescript-eslint/no-unused-vars
  direction: OrderDirection;
}
