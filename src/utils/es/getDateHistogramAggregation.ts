import { convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getDateHistogramAggregation = async (esClient, esIndex, query, field, aggOptions) => {
  let filterQuery = { ...query };
  filterQuery = await convertSqonToEs(filterQuery);

  let results = { buckets: [] };

  const calendarInterval = aggOptions.calendarInterval === undefined ? 'week' : aggOptions.calendarInterval;

  const additionalAggs = {};
  if (aggOptions.movingWindow !== undefined) {
    const movingWindow = aggOptions.movingWindow === undefined ? 4 : aggOptions.movingWindow;

    //https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movfn-aggregation.html
    //https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#buckets-path-syntax

    additionalAggs['moving'] = {
      moving_fn: {
        buckets_path: '_count',
        window: movingWindow,
        gap_policy: 'insert_zeros',
        script: 'MovingFunctions.unweightedAvg(values)',
      },
    };
    if (aggOptions.sumField !== undefined) {
      additionalAggs['movingPts'] = {
        moving_fn: {
          buckets_path: 'sum',
          window: movingWindow,
          gap_policy: 'insert_zeros',
          script: 'MovingFunctions.unweightedAvg(values)',
        },
      };
    }
  }
  if (aggOptions.sumField !== undefined) {
    additionalAggs['sum'] = {
      sum: {
        field: aggOptions.sumField,
      },
    };
  }
  if (aggOptions.avgField !== undefined) {
    additionalAggs['avg'] = {
      avg: {
        field: aggOptions.avgField,
      },
    };
  }

  const esQuerySearch = {
    index: esIndex,
    size: 0,
    body: {
      query: filterQuery,
      aggs: {
        aggregations: {
          date_histogram: {
            field,
            calendar_interval: calendarInterval,
            offset: '-1d',
          },
          aggs: additionalAggs,
        },
      },
    },
  };

  const datasets: ApiResponse = await esClient.search(esQuerySearch);

  if (datasets.body.aggregations === undefined) {
    return {
      buckets: [],
      field,
      esQuery: JSON.stringify(esQuerySearch),
    };
  }
  results = datasets.body.aggregations.aggregations;
  return {
    buckets: results.buckets.map((bucket) => {
      const formattedBucket = {
        key: bucket.key,
        keyAsString: bucket.key_as_string,
        docCount: bucket.doc_count,
      };
      if (aggOptions.sumField !== undefined) {
        formattedBucket['sum'] = bucket.sum !== undefined ? bucket.sum.value : 0;
      }
      if (aggOptions.avgField !== undefined) {
        formattedBucket['avg'] = bucket.avg !== undefined ? bucket.avg.value : 0;
      }
      if (aggOptions.movingWindow !== undefined) {
        formattedBucket['moving'] = bucket.moving !== undefined ? bucket.moving.value : 0;
        formattedBucket['movingPts'] = bucket.movingPts !== undefined ? bucket.movingPts.value : 0;
      }
      return formattedBucket;
    }),
    field,
    esQuery: JSON.stringify(esQuerySearch),
  };
};

export default getDateHistogramAggregation;
