import { Injectable, Logger } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { buildQuery } from '@arranger/middleware';

import { EsClientService } from '../../../esClient.service';

import { getNestedFields } from '../../query';

@Injectable()
export default class DataItemsService {
  private readonly logger = new Logger(DataItemsService.name);
  constructor(private readonly esClientService: EsClientService) {}

  async findAll(from, size, query, orderBy, esIndex, includeDisabled = false): Promise<any> {
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
        match_all: {},
      };
    }

    // Adding a filter not to return disabled documents
    if (includeDisabled === false) {
      updatedQuery = {
        bool: {
          must: updatedQuery,
          must_not: {term: {disabled: true}}
        }
      }
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
        nodes: results.hits.map((hit) => hit._source),
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

  async disableDocument(id: string, esIndex: string, username: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    console.log('Receive request to disable: ' + id)
    await esClient.update({ 
      id: id, 
      index: esIndex, 
      body: {
        doc: {
          disabled: true,
          disabled_date: new Date().toISOString(),
          disabled_by: username === '' ? 'API' : username
        }
      },
      refresh: 'wait_for'
    });
  }

  async enableDocument(id: string, esIndex: string, username: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    console.log('Receive request to enable: ' + id)
    await esClient.update({ 
      id: id, 
      index: esIndex, 
      body: {
        doc: {
          disabled: false,
          disabled_date: new Date().toISOString(),
          disabled_by: username === '' ? 'API' : username
        }
      },
      refresh: 'wait_for'
    });
  }

  async updateDocumentField(id: string, esIndex: string, username: string, value: any, documentField: string): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    console.log('Receive request to set value: ' + value + ' to document field: ' + documentField)

    const docPayload = {}
    docPayload[documentField] = value;
    docPayload[documentField + '_date'] = new Date().toISOString();
    docPayload[documentField + '_by'] = username === '' ? 'API' : username
    
    await esClient.update({ 
      id: id, 
      index: esIndex, 
      body: {
        doc: docPayload
      },
      refresh: 'wait_for'
    });
  }

}
