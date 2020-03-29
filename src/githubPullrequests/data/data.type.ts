import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class GithubPullrequestsData {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;
}
