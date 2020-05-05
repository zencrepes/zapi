import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class BranchProtectionRule {
  @Field(() => ID)
  id: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Can admins overwrite branch protection.',
  })
  isAdminEnforced: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'Identifies the protection rule pattern.',
  })
  pattern: string;

  @Field(() => Number, {
    nullable: true,
    description: 'Number of approving reviews required to update matching branches.',
  })
  requiredApprovingReviewCount: number;

  @Field(() => String, {
    nullable: true,
    description:
      'List of required status check contexts that must pass for commits to be accepted to matching branches.',
  })
  requiredStatusCheckContexts: string[];

  @Field(() => Boolean, {
    nullable: false,
    description: 'Are approving reviews required to update matching branches.',
  })
  requiresApprovingReviews: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Are reviews from code owners required to update matching branches.',
  })
  requiresCodeOwnerReviews: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Are commits required to be signed',
  })
  requiresCommitSignatures: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Are status checks required to update matching branches.',
  })
  requiresStatusChecks: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Are branches required to be up to date before merging.',
  })
  requiresStrictStatusChecks: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is pushing to matching branches restricted.',
  })
  restrictsPushes: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is dismissal of pull request reviews restricted.',
  })
  restrictsReviewDismissals: boolean;
}
