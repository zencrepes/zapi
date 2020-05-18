import { Field, ObjectType, ID } from '@nestjs/graphql';

import Repository from './repository';

@ObjectType()
export default class Source {
  @Field(() => ID)
  id: string;

  @Field(() => Repository, {
    nullable: true,
    description: 'The source repository.',
  })
  repository: Repository;
}
