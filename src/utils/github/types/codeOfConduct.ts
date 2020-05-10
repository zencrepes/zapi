import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class CodeOfConduct {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'The key for the Code of Conduct',
  })
  key: string;

  @Field(() => String, {
    nullable: false,
    description: 'The formal name of the Code of Conduct',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'The body of the Code of Conduct',
  })
  body: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this Code of Conduct',
  })
  url: string;
}
