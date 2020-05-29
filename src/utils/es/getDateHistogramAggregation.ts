import { convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getDateHistogramAggregation = async (esClient, esIndex, query, field, aggOptions) => {
  let filterQuery = { ...query };
  filterQuery = await convertSqonToEs(filterQuery);

  let results = { buckets: [] };

  const calendarInterval =
    // eslint-disable-next-line @typescript-eslint/camelcase
    aggOptions.calendarInterval === undefined ? 'week' : aggOptions.calendarInterval;

  const additionalAggs = {};
  if (aggOptions.movingWindow !== undefined) {
    const movingWindow =
      // eslint-disable-next-line @typescript-eslint/camelcase
      aggOptions.movingWindow === undefined ? 4 : aggOptions.movingWindow;

    additionalAggs['moving'] = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      moving_fn: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        buckets_path: '_count',
        window: movingWindow,
        script: 'MovingFunctions.unweightedAvg(values)',
      },
    };
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

  const datasets: ApiResponse = await esClient.search({
    index: esIndex,
    size: 0,
    body: {
      query: filterQuery,
      aggs: {
        aggregations: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          date_histogram: {
            field,
            // eslint-disable-next-line @typescript-eslint/camelcase
            calendar_interval: calendarInterval,
            offset: '-1d',
          },
          aggs: additionalAggs,
        },
      },
    },
  });

  results = datasets.body.aggregations.aggregations;
  return {
    buckets: results.buckets.map(bucket => {
      const formattedBucket = {
        key: bucket.key,
        keyAsString: bucket.key_as_string,
        docCount: bucket.doc_count,
      };
      // console.log(bucket);
      if (aggOptions.sumField !== undefined) {
        formattedBucket['sum'] = bucket.sum !== undefined ? bucket.sum.value : 0;
      }
      if (aggOptions.avgField !== undefined) {
        formattedBucket['avg'] = bucket.avg !== undefined ? bucket.avg.value : 0;
      }
      if (aggOptions.movingWindow !== undefined) {
        formattedBucket['moving'] = bucket.moving !== undefined ? bucket.moving.value : 0;
      }
      // console.log(formattedBucket);
      return formattedBucket;
    }),
    field,
  };
};

export default getDateHistogramAggregation;
