import { Field, ObjectType } from '@nestjs/graphql';

import Organization from './organization';

@ObjectType()
export default class OrganizationEdge {
  @Field(() => Organization, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Organization;
}
