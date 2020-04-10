import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';
import { clearCurrentField } from '../../../utils/query';

const runTermAggregation = async (esClient, esIndex, query, field) => {
  let filterQuery = { ...query };
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

  let results = { buckets: [] };

  if (field.includes('.edges.')) {
    const splitField = field.split('.edges.');
    const nestedPath = splitField[0] + '.edges';
    const datasets: ApiResponse = await esClient.search({
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
    const datasets: ApiResponse = await esClient.search({
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
      return {
        key: bucket.key,
        keyAsString: bucket.key,
        docCount: bucket.doc_count,
      };
    }),
    field,
  };
};

const runDateHistogramAggregation = async (
  esClient,
  esIndex,
  query,
  field,
  aggregationOptions,
) => {
  let filterQuery = { ...query };

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

  let results = { buckets: [] };

  const calendarInterval =
    aggregationOptions.calendar_interval === undefined
      ? 'week'
      : aggregationOptions.calendar_interval;

  const datasets: ApiResponse = await esClient.search({
    index: esIndex,
    size: 0,
    body: {
      query: updatedQuery,
      aggs: {
        aggregations: {
          date_histogram: {
            field,
            calendar_interval: calendarInterval,
          },
        },
      },
    },
  });
  results = datasets.body.aggregations.aggregations;

  return {
    buckets: results.buckets.map(bucket => {
      return {
        key: bucket.key,
        keyAsString: bucket.key_as_string,
        docCount: bucket.doc_count,
      };
    }),
    field,
  };
};

@Injectable()
export default class DataAggregationsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(
    field: string,
    query: any,
    aggType: string,
    aggOptions: string,
  ): Promise<any> {
    let filterQuery = JSON.parse(query);
    // let aggOptions = JSON.parse(options);
    const aggregationType = aggType === undefined ? 'term' : aggType;
    const aggregationOptions =
      aggOptions === undefined ? {} : JSON.parse(aggOptions);

    if (aggregationType === 'term') {
      return await runTermAggregation(
        this.esClient,
        'gh_prs_',
        filterQuery,
        field,
      );
    }

    if (aggregationType === 'date_histogram') {
      return await runDateHistogramAggregation(
        this.esClient,
        'gh_prs_',
        filterQuery,
        field,
        aggregationOptions,
      );
    }
  }
}
