import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class GithubRepositoriesData {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query: string;

  @Field({
    nullable: false,
    description: 'Transformation of the received query in an Elasticsearch query',
  })
  esQuery: string;
}
