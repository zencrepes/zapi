import { Injectable, Logger } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { buildQuery } from '@arranger/middleware';

import { EsClientService } from '../../../esClient.service';

import { getNestedFields } from '../../query';

@Injectable()
export default class DataItemsService {
  private readonly logger = new Logger(DataItemsService.name);
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(from, size, query, orderBy, esIndex): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    const queryObj = JSON.parse(query);
    const nestedFields = getNestedFields(queryObj);

    let sort: Array<any> = ['_score'];
    if (orderBy !== undefined) {
      const customSort = {};
      customSort[orderBy.field] = { order: orderBy.direction };
      sort = [customSort, ...sort];
    }

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

    // console.log('Query Transformation: ');
    // console.log(JSON.stringify(queryObj));
    // console.log(JSON.stringify(prepQuery));
    // console.log(JSON.stringify(updatedQuery));

    // If size === 0 or very large, we use the scroll API to return all results.
    // This is useful for features such as TSV export
    // OTherwise, use the regular search
    if (size === 0 || size > 5000) {
      let issues: any[] = [];
      const scrollSearch = esClient.helpers.scrollSearch({
        index: esIndex,
        body: {
          query: updatedQuery,
          sort,
        },
      });
      for await (const result of scrollSearch) {
        issues = [...issues, ...result.documents];
      }
      return {
        nodes: issues,
        totalCount: issues.length,
      };
    } else {
      const esQuery = {
        index: esIndex,
        body: {
          from: from === undefined ? 0 : from,
          size: from === undefined ? 10 : size,
          query: updatedQuery,
          sort,
        },
      };
      const datasets: ApiResponse = await esClient.search(esQuery);
      const results = datasets.body.hits;
      return {
        nodes: results.hits.map(hit => hit._source),
        totalCount: results.total.value,
      };
    }
  }

  async findOneById(id: string, esIndex: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();

    let nodesSearch: any = null;
    try {
      nodesSearch = await esClient.get({ id: id, index: esIndex });
    } catch (e) {
      this.logger.warn('findOneById: Node: ' + id + ' does not exist');
    }

    if (nodesSearch !== null) {
      return nodesSearch.body._source;
    }
    return nodesSearch;
  }
}
