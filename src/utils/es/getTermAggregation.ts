import { clearCurrentField, getNestedFields, convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getTermAggregation = async (
  esClient,
  esIndex,
  query,
  field,
  disjoint,
) => {
  let filterQuery = { ...query };
  if (disjoint === true) {
    filterQuery = clearCurrentField(filterQuery, field);
  }
  filterQuery = await convertSqonToEs(filterQuery);

  let results = { buckets: [] };

  if (field.includes('.edges.')) {
    const splitField = field.split('.edges.');
    const nestedPath = splitField[0] + '.edges';
    const datasets: ApiResponse = await esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: filterQuery,
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
        query: filterQuery,
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

export default getTermAggregation;
