import { Field, ObjectType } from '@nestjs/graphql';

import BranchProtectionRule from './branchProtectionRule';

@ObjectType()
export default class BranchProtectionRuleEdge {
  @Field(() => BranchProtectionRule, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: BranchProtectionRule;
}
