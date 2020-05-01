import { Field, ObjectType, ID } from '@nestjs/graphql';

import User from './user';
import Repository from './repository';
import SecurityVulnerability from './securityVulnerability';

@ObjectType()
export default class RepositoryVulnerabilityAlert {

  @Field(() => ID)
  id: string;

  @Field(() => String, {
    nullable: false,
    description: 'Identifies the date and time when the object was created',
  })
  createdAt: string;

  @Field(() => String, {
    nullable: true,
    description: 'The reason the alert was dismissed',
  })
  dismissReason?: string;

  @Field(() => String, {
    nullable: true,
    description: 'When was the alert dimissed?',
  })
  dismissedAt?: string;

  @Field(() => User, {
    nullable: true,
    description: 'The user who dismissed the alert',
  })
  dismisser: User;

  @Field(() => Repository, {
    nullable: false,
    description: 'The repository where the alert is located',
  })
  repository: Repository;

  @Field(() => String, {
    nullable: false,
    description: 'The vulnerable manifest path',
  })
  vulnerableManifestPath: string;  

  @Field(() => String, {
    nullable: false,
    description: 'The vulnerable manifest filename',
  })
  vulnerableManifestFilename: string;  

  @Field(() => String, {
    nullable: false,
    description: 'The vulnerable requirements',
  })
  vulnerableRequirements: string;  

  @Field(() => SecurityVulnerability, {
    nullable: false,
    description: 'The vulnerable requirements',
  })
  securityVulnerability: SecurityVulnerability;  
}
