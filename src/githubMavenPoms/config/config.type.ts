import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class GithubMavenPomsConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
