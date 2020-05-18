import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class JiraVersion {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Name of the version',
  })
  name: string;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is the version archived',
  })
  archived: boolean;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Is the version released',
  })
  released: boolean;

  @Field(() => String, {
    nullable: false,
    description: 'Date of the release',
  })
  releaseDate: string;
}
