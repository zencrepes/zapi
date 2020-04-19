import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(type => Int, { nullable: true })
  from?: number;

  @Field(type => Int, { nullable: true })
  size?: number;
}
