import { Field, ObjectType } from '@nestjs/graphql';

import Language from './language';

@ObjectType()
export default class LanguageEdge {
  @Field(() => Language, {
    nullable: false,
    description: 'The item at the end of the edge.',
  })
  node: Language;
}
