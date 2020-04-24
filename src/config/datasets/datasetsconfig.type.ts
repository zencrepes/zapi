import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class DatasetsConfig {
  @Field({
    nullable: false,
    description: 'Query received as a parameter',
  })
  query?: string;
}
