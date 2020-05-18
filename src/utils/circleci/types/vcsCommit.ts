import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class VcsCommit {
  @Field(() => String, {
    nullable: false,
    description: 'Body of the commit',
  })
  body: string;

  @Field(() => String, {
    nullable: false,
    description: 'Subject of the commit',
  })
  subject: string;
}
