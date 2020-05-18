import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import Config from './config.type';
import ConfigAggregationsService from '../../utils/config/aggregations/aggregations.service';
import ConfigAggregations from '../../utils/config/aggregations/aggregations.type';
import ConfigTableService from '../../utils/config/table/table.service';
import ConfigTable from '../../utils/config/table/table.type';

// https://github.com/nestjs/graphql/issues/475

@Resolver(Config)
export default class ConfigResolver {
  constructor(
    private readonly aggregationsService: ConfigAggregationsService,
    private readonly tableService: ConfigTableService,
  ) {}

  @ResolveField(() => ConfigAggregations, {
    name: 'aggregations',
    description: 'Returns a paginated list of available aggregations',
  })
  public async getAggregations(
    @Parent()
    parent: Config, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const data = this.aggregationsService.findAll('githubVulnerabilities');
    return data;
  }

  @ResolveField(() => ConfigTable, {
    name: 'table',
    description: 'Returns the table configuration for this datatype',
  })
  public async getTable(
    @Parent()
    parent: Config, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const data = this.tableService.findAll('githubVulnerabilities');
    return data;
  }
}
