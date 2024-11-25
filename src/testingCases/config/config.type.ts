import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class TestingCasesConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
