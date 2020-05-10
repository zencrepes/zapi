import { Field, ObjectType, Int } from '@nestjs/graphql';

import LanguageEdge from './languageEdge';

@ObjectType()
export default class LanguageConnection {
  @Field(() => [LanguageEdge], {
    nullable: false,
    description: 'A list of edges.',
  })
  edges: LanguageEdge[];

  @Field(() => Int, {
    nullable: false,
    description: 'Identifies the total count of items in the connection.',
  })
  totalCount: string;
}
