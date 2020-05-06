import { clearCurrentField, convertSqonToEs, addFilterToQuery, createTermFilter } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getTermAggregation = async (esClient, esIndex, query, field, disjoint) => {
  let filterQuery = { ...query };
  if (disjoint === true) {
    filterQuery = clearCurrentField(filterQuery, field);
  }
  const convertedQuery = await convertSqonToEs(filterQuery);

  let resultsBuckets: any[] = [];

  if (field.includes('.edges.')) {
    const splitField = field.split('.edges.');
    const nestedPath = splitField[0] + '.edges';
    const datasets: ApiResponse = await esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: convertedQuery,
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

    // Calculate how many elements have totalCount of 0 for the empty bucket
    const newFilter = createTermFilter('<=', splitField[0] + '.totalCount', 0);
    const emptyValueCountQuery = addFilterToQuery(newFilter, filterQuery);
    const emptyValueEs = await convertSqonToEs(emptyValueCountQuery);
    const emptuBucket: ApiResponse = await esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: emptyValueEs,
      },
    });
    resultsBuckets = [
      ...datasets.body.aggregations.nestedAgg.byTerm.buckets,
      // eslint-disable-next-line @typescript-eslint/camelcase
      ...[{ key: '_EMPTY_', doc_count: emptuBucket.body.hits.total.value }],
    ];
  } else {
    const datasets: ApiResponse = await esClient.search({
      index: esIndex,
      size: 0,
      body: {
        query: convertedQuery,
        aggs: {
          aggregations: {
            terms: {
              field,
              order: { _count: 'desc' },
              size: 1000,
            },
          },
          emptyValues: {
            missing: { field: field },
          },
        },
      },
    });
    resultsBuckets = [
      ...datasets.body.aggregations.aggregations.buckets,
      // eslint-disable-next-line @typescript-eslint/camelcase
      ...[{ key: '_EMPTY_', doc_count: datasets.body.aggregations.emptyValues.doc_count }],
    ];
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  resultsBuckets = resultsBuckets.sort((a, b) => b.doc_count - a.doc_count);

  return {
    buckets: resultsBuckets
      .filter(bucket => bucket.doc_count > 0)
      .map(bucket => {
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
