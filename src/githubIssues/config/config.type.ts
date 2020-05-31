import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class GithubIssuesConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
