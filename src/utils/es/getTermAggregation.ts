import { clearCurrentField, convertSqonToEs, addFilterToQuery, createTermFilter } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

const getObjectValue = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const getTermAggregation = async (esClient, esIndex, query, field, aggOptions, disjoint) => {
  let filterQuery = { ...query };
  if (
    (disjoint === true && aggOptions.disjoint === undefined) ||
    (aggOptions.disjoint !== undefined && aggOptions.disjoint === true)
  ) {
    filterQuery = clearCurrentField(filterQuery, field);
  }

  const convertedQuery = await convertSqonToEs(filterQuery);

  const metadataFields = aggOptions.metadata === undefined ? [] : aggOptions.metadata;

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
                  size: 10000,
                },
                aggs: {
                  metadata: {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    top_hits: {
                      size: 1,
                    },
                  },
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
      ...[{ key: '__missing__', doc_count: emptuBucket.body.hits.total.value }],
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
              size: 10000,
            },
            aggs: {
              metadata: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                top_hits: {
                  size: 1,
                },
              },
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
      ...[{ key: '__missing__', doc_count: datasets.body.aggregations.emptyValues.doc_count }],
    ];
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  resultsBuckets = resultsBuckets.sort((a, b) => b.doc_count - a.doc_count);

  return {
    buckets: resultsBuckets
      .filter(bucket => bucket.doc_count > 0)
      .map(bucket => {
        const metadata = {};
        if (bucket.metadata !== undefined && bucket.metadata.hits.hits.length > 0) {
          for (const m of metadataFields) {
            metadata[m] = getObjectValue(bucket.metadata.hits.hits[0]._source.node, m);
          }
        }
        return {
          key: bucket.key,
          keyAsString: bucket.key,
          docCount: bucket.doc_count,
          metadata: JSON.stringify(metadata),
        };
      }),
    field,
  };
};

export default getTermAggregation;
