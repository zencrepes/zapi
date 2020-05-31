import { Field, ObjectType, ID } from '@nestjs/graphql';
import ProjectCardConnection from './projectCardConnection';

@ObjectType()
export default class ProjectColumn {
  @Field(() => ID)
  id: string;

  @Field({
    nullable: false,
    description: 'Identifies the primary key from the database.',
  })
  databaseId: number;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the object name.',
  })
  name: string;

  @Field(() => ProjectCardConnection, {
    nullable: false,
    description: 'List of associated project cards.',
  })
  cards: ProjectCardConnection;
}
