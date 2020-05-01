import { Field, ObjectType, ID } from '@nestjs/graphql';

import { SecurityAdvisorySeverity } from './securityAdvisorySeverity'

@ObjectType()
export default class SecurityAdvisory {

  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'When the advisory was published',
  })
  publishedAt: string;

  @Field(() => String, {
    nullable: false,
    description: 'The organization that originated the advisory',
  })
  origin: string;

  @Field(() => String, {
    nullable: false,
    description: 'A short plaintext summary of the advisory',
  })
  summary: string;

  @Field(() => String, {
    nullable: false,
    description: 'This is a long plaintext description of the advisory',
  })
  description: string;

  @Field(() => SecurityAdvisorySeverity) 
  severity: SecurityAdvisorySeverity;

  @Field(() => String, {
    nullable: false,
    description: 'The GitHub Security Advisory ID',
  })
  ghsaId: string;

  @Field(() => String, {
    nullable: false,
    description: 'The permalink for the advisory',
  })
  permalink: string;
}
