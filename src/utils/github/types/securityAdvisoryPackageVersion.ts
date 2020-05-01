import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class SecurityAdvisoryPackageVersion {
  @Field(() => String, {
    nullable: false,
    description: 'The package name or version',
  })
  identifier: string;
}
