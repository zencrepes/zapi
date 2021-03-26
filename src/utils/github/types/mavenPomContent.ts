import { Field, ObjectType } from '@nestjs/graphql';

import MavenPomContentParent from './mavenPomContentParent';


@ObjectType()
export default class MavenPomContent {
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
    description: 'Name',
  })
  name: string;    

  @Field(() => String, {
    nullable: true,
    description: 'Description',
  })
  description: string; 
  
  @Field(() => MavenPomContentParent, {
    nullable: true,
    description: 'Parent detailed in the pom file',
  })
  parent: MavenPomContentParent;  
}
