import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class GithubProjectsConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
