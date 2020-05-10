import { Field, ObjectType, Int } from '@nestjs/graphql';

import BranchProtectionRuleEdge from './branchProtectionRuleEdge';

@ObjectType()
export default class BranchProtectionRuleConnection {
  @Field(() => [BranchProtectionRuleEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: BranchProtectionRuleEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
