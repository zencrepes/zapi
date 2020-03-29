import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class GithubPullrequestsConfig {
  @Field(type => String)
  query: string;
}
