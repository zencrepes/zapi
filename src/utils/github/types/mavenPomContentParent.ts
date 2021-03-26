import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class MavenPomContentParent {
  @Field(() => String, {
    nullable: true,
    description: 'Version',
  })
  version: string;

  @Field(() => String, {
    nullable: true,
    description: 'Artifact ID',
  })
  artifactId: string;  

  @Field(() => String, {
    nullable: true,
    description: 'Group ID',
  })
  groupId: string;
}
