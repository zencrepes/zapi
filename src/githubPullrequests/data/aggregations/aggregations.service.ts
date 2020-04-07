import { Client, ApiResponse } from '@elastic/elasticsearch';

import { buildQuery } from '@arranger/middleware';

const clearCurrentField = (query: any, field: string) => {
  // Remove the current field from query, allowing for disjointive facets
  if (Object.keys(query).length === 0) {
    return query;
  }
  return {
    ...query,
    content: query.content.filter(
      (filter: any) => filter.content.field !== field,
    ),
  };
};

const getNestedFields = (query: any) => {
  const availableFields = query.content
    .map((filter: any) => filter.content.field)
    .filter((field: string) => field.includes('.edges.'));
  if (availableFields.length === 0) {
    return [];
  }
  return availableFields.map(
    (field: string) => field.split('.edges.')[0] + '.edges',
  );
};

const fetchAggregations = async (field: string, query: any) => {
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
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
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
      return { key: bucket.key, docCount: bucket.doc_count };
    }),
    field,
  };
};
export default fetchAggregations;
