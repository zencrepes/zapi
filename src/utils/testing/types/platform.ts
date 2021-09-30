import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class Platform {
  @Field(() => String, {
    nullable: false,
    description: 'Name of the vendor',
  })
  vendor: string;

  @Field(() => String, {
    nullable: true,
    description: 'Tenant/account within the vendor',
  })
  tenant: string;  

  @Field(() => String, {
    nullable: false,
    description: 'Region in which the run was executed',
  })
  region: string;
}
