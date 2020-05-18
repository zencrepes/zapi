import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import JiraIssues from './jiraIssues.type';
import JiraIssuesData from './data/data.type';
import JiraIssuesConfig from './config/config.type';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../utils/query';
import DataCountService from '../utils/data/count/count.service';

const getEsQuery = async (query: string) => {
  const queryObj = JSON.parse(query);
  const nestedFields = getNestedFields(queryObj);

  const prepQuery = {
    nestedFields,
    filters: queryObj,
  };

  let updatedQuery = await buildQuery(prepQuery);
  if (Object.entries(updatedQuery).length === 0) {
    updatedQuery = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      match_all: {},
    };
  }
  return JSON.stringify(updatedQuery);
};

// https://github.com/nestjs/graphql/issues/475
@Resolver(JiraIssues)
export default class JiraIssuesResolver {
  constructor(private readonly countService: DataCountService) {}
  @Query(() => JiraIssues, {
    name: 'jiraIssues',
    description: 'Fetch data (items, aggregatiosn) related to the dataset',
  })
  public async geJiraIssues(): Promise<JiraIssues> {
    return new JiraIssues();
  }

  @ResolveField(() => JiraIssuesData, {
    name: 'data',
    description: 'Access to the dataset as individual items, aggregations and more',
  })
  public async getData(
    @Args({
      name: 'query',
      type: () => String,
      description: 'Query used to filter down content',
      nullable: true,
    })
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Parent() parent: JiraIssues,
  ): Promise<JiraIssuesData> {
    const data = new JiraIssuesData();
    if (query === undefined || query === null) {
      query = JSON.stringify({});
    }
    data.query = query;
    data.esQuery = await getEsQuery(query);
    data.count = await this.countService.getCount(query, 'j_issues_');
    return data;
  }

  @ResolveField(() => JiraIssuesConfig, {
    name: 'config',
    description: 'Access to configuration values and metadata',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getConfig(@Parent() parent: JiraIssues): Promise<JiraIssuesConfig> {
    return new JiraIssuesConfig();
  }
}
