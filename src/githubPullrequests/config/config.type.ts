import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class GithubPullrequestsConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
