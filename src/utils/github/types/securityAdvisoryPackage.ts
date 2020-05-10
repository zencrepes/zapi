import { Field, ObjectType } from '@nestjs/graphql';

import { SecurityAdvisoryEcosystem } from './securityAdvisoryEcosystem';

@ObjectType()
export default class SecurityAdvisoryPackage {
  @Field(() => String, {
    nullable: false,
    description: 'The ecosystem the package belongs to, e.g. RUBYGEMS, NPM',
  })
  name: string;

  @Field(() => SecurityAdvisoryEcosystem, {
    nullable: false,
    description: 'The organization that originated the advisory',
  })
  ecosystem: SecurityAdvisoryEcosystem;
}
