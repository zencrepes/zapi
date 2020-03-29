import { Field, ObjectType, ClassType, Int } from 'type-graphql';

export default function Paginated<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(type => [TItemClass], { nullable: true })
    nodes: Array<TItem>;

    @Field(type => Int)
    totalCount: number;
  }
  return PaginatedType;
}
