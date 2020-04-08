import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';
import { clearCurrentField } from '../../../utils/query';

@Injectable()
export default class DataAggregationsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(field: string, query: any): Promise<any> {
    let filterQuery = JSON.parse(query);
    filterQuery = clearCurrentField(filterQuery, field);

    const nestedFields =
      Object.keys(filterQuery).length > 0 ? getNestedFields(filterQuery) : [];
    const prepQuery = {
      nestedFields,
      filters: filterQuery,
    };

    let updatedQuery = await buildQuery(prepQuery);
    if (Object.entries(updatedQuery).length === 0) {
      updatedQuery = {
        match_all: {},
      };
    }

    const esIndex = 'gh_prs_';
    let results = { buckets: [] };

    if (field.includes('.edges.')) {
      const splitField = field.split('.edges.');
      const nestedPath = splitField[0] + '.edges';
      const datasets: ApiResponse = await this.esClient.search({
        index: esIndex,
        size: 0,
        body: {
          query: updatedQuery,
          aggs: {
            nestedAgg: {
              nested: { path: nestedPath },
              aggs: {
                byTerm: {
                  terms: {
                    field,
                    order: { _count: 'desc' },
                    size: 1000,
                  },
                },
              },
            },
          },
        },
      });
      results = datasets.body.aggregations.nestedAgg.byTerm;
    } else {
      const datasets: ApiResponse = await this.esClient.search({
        index: esIndex,
        size: 0,
        body: {
          query: updatedQuery,
          aggs: {
            aggregations: {
              terms: {
                field,
                order: { _count: 'desc' },
                size: 1000,
              },
            },
          },
        },
      });
      results = datasets.body.aggregations.aggregations;
    }

    return {
      buckets: results.buckets.map(bucket => {
        return { key: bucket.key, docCount: bucket.doc_count };
      }),
      field,
    };
  }
}
