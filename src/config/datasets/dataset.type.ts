import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Dataset {
  @Field(type => ID)
  id: string;

  @Field({
    nullable: false,
    description: 'Key representing the dataset in the tool configuration',
  })
  key: string;

  @Field({
    nullable: true,
    description: 'Displayable name of the dataset',
  })
  name: string;

  @Field({
    nullable: true,
    description: 'Elasticsearch index containing the dataset',
  })
  index: string;

  @Field({
    nullable: true,
    description: 'Is the dataset active or not',
  })
  active: boolean;
}
