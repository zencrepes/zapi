import { Field, ObjectType, Int } from '@nestjs/graphql';

import RepositoryVulnerabilityAlert from '../../../utils/github/types/repositoryVulneratbilityAlert';

@ObjectType()
export default class VulnerabilityConnection {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => [RepositoryVulnerabilityAlert], { nullable: true })
  nodes: RepositoryVulnerabilityAlert[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int)
  totalCount: number;
}
