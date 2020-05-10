import { Field, InputType } from '@nestjs/graphql';
import { OrderDirection } from './order-direction.type';

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(() => OrderDirection) // eslint-disable-line @typescript-eslint/no-unused-vars
  direction: OrderDirection;
}
