import { convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export const getDateHistogramRollingAggregation = async (esClient, esIndex, query, field, aggregationOptions) => {
  let filterQuery = { ...query };
  filterQuery = await convertSqonToEs(filterQuery);

  let results = { buckets: [] };

  const calendarInterval =
    // eslint-disable-next-line @typescript-eslint/camelcase
    aggregationOptions.calendar_interval === undefined ? 'week' : aggregationOptions.calendar_interval;
  const movingWindow =
    // eslint-disable-next-line @typescript-eslint/camelcase
    aggregationOptions.moving_window === undefined ? 4 : aggregationOptions.moving_window;

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
          aggs: {
            movingAvg: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              moving_fn: {
                buckets_path: '_count',
                window: movingWindow,
                script: 'MovingFunctions.unweightedAvg(values)',
              },
            },
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
        docCountMovingAvg:
          bucket.movingAvg !== undefined && bucket.movingAvg.value !== null ? bucket.movingAvg.value : 0,
      };
    }),
    field,
  };
};

export default getDateHistogramRollingAggregation;
