import { clearCurrentField, getNestedFields, convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getDateHistogramAggregation = async (
  esClient,
  esIndex,
  query,
  field,
  aggregationOptions,
) => {
  let filterQuery = { ...query };
  filterQuery = await convertSqonToEs(filterQuery);

  let results = { buckets: [] };

  const calendarInterval =
    aggregationOptions.calendar_interval === undefined
      ? 'week'
      : aggregationOptions.calendar_interval;

  const datasets: ApiResponse = await esClient.search({
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

export default getDateHistogramAggregation;
