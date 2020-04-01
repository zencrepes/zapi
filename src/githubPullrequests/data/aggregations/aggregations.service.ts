import { Client, ApiResponse } from '@elastic/elasticsearch';

const fetchAggregations = async field => {
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
