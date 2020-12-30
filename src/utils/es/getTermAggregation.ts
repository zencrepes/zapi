import { clearCurrentField, convertSqonToEs, addFilterToQuery, createTermFilter } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

const getObjectValue = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
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
    // Note that we only run disjonctive facets if the query doesn't contain that field with the subfilter tag
    filterQuery = clearCurrentField(filterQuery, field, aggOptions.tag);
  }

  const convertedQuery = await convertSqonToEs(filterQuery);
  const metadataFields = aggOptions.metadata === undefined ? [] : aggOptions.metadata;

  let resultsBuckets: any[] = [];

  if (field.includes('.edges.')) {
    const splitField = field.split('.edges.');
    const nestedPath = splitField[0] + '.edges';

    const pointsAgg =
      aggOptions.points === true
        ? {
            points: {
              sum: {
                field: nestedPath + '.points',
              },
            },
          }
        : {};

    const searchQuery = {
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
                    top_hits: {
                      size: 1,
                    },
                  },
                  ...pointsAgg,
                },
              },
            },
          },
        },
      },
    };
    const datasets: ApiResponse = await esClient.search(searchQuery);

    // Calculate how many elements have totalCount of 0 for the empty bucket
    const newFilter = createTermFilter('<=', splitField[0] + '.totalCount', 0);
    const emptyValueCountQuery = addFilterToQuery(newFilter, filterQuery);
    const emptyValueEs = await convertSqonToEs(emptyValueCountQuery);
    if (aggOptions.points === true) {
      const emptyBucket: ApiResponse = await esClient.search({
        index: esIndex,
        size: 0,
        body: {
          query: emptyValueEs,
          aggs: {
            points: {
              sum: {
                field: 'points',
              },
            },
          },
        },
      });
      resultsBuckets = [
        ...datasets.body.aggregations.nestedAgg.byTerm.buckets,
        ...[
          {
            key: '__missing__',
            doc_count: emptyBucket.body.hits.total.value,
            points: emptyBucket.body.aggregations.points,
          },
        ],
      ];
    } else {
      const emptyBucket: ApiResponse = await esClient.search({
        index: esIndex,
        size: 0,
        body: {
          query: emptyValueEs,
        },
      });
      if (datasets.body.aggregations.nestedAgg.doc_count === 0) {
        resultsBuckets = [];
      } else {
        resultsBuckets = [
          ...datasets.body.aggregations.nestedAgg.byTerm.buckets,
          ...[{ key: '__missing__', doc_count: emptyBucket.body.hits.total.value }],
        ];
      }
    }
  } else {
    const pointsAgg =
      aggOptions.points === true
        ? {
            points: {
              sum: {
                field: 'points',
              },
            },
          }
        : {};
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
                top_hits: {
                  size: 1,
                },
              },
              ...pointsAgg,
            },
          },
          emptyValues: {
            missing: { field: field },
            aggs: {
              ...pointsAgg,
            },
          },
        },
      },
    });
    let aggsBuckets = [];
    let emptyBuckets = {
      key: '__missing__',
      points: 0,
      doc_count: 0,
    };
    if (datasets.body.aggregations !== undefined) {
      aggsBuckets = datasets.body.aggregations.aggregations.buckets;
      emptyBuckets = {
        key: '__missing__',
        points: aggOptions.points === true ? datasets.body.aggregations.emptyValues.points : 0,
        doc_count: datasets.body.aggregations.emptyValues.doc_count,
      };
    }

    resultsBuckets = [...aggsBuckets, ...[emptyBuckets]];
  }

  resultsBuckets = resultsBuckets.sort((a, b) => b.doc_count - a.doc_count);

  return {
    buckets: resultsBuckets
      .filter((bucket) => bucket.doc_count > 0)
      .map((bucket) => {
        const metadata = {};
        if (bucket.metadata !== undefined && bucket.metadata.hits.hits.length > 0) {
          for (const m of metadataFields) {
            metadata[m] = getObjectValue(bucket.metadata.hits.hits[0]._source.node, m);
          }
        }
        let count = bucket.points === undefined ? bucket.doc_count : bucket.points.value;
        if (count === undefined && aggOptions.points !== true) {
          count = bucket.doc_count
        }
        const sum = bucket.points === undefined ? bucket.doc_count : bucket.points.value;
        return {
          key: bucket.key,
          keyAsString: bucket.key,
          docCount: bucket.doc_count,
          count,
          sum,
          metadata: JSON.stringify(metadata),
        };
      }),
    field,
  };
};

export default getTermAggregation;
