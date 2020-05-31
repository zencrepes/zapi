import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export default class ReferencedSubject {
  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'The type of node (Issue or PullRequest)',
  })
  typename: string;

  @Field(() => String, {
    nullable: false,
    description: ' Identifies the issue number.',
  })
  number: number;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the object title.',
  })
  title: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the state of the PR.',
  })
  state: string;

  @Field(() => String, {
    nullable: false,
    description: 'The HTTP URL for this PR.',
  })
  url: string;
}
