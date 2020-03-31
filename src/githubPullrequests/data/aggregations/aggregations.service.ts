import { Client, ApiResponse } from '@elastic/elasticsearch';

const fetchAggregations = async field => {
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
  const datasets: ApiResponse = await esClient.search({
    index: 'gh_prs_',
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
  const results = datasets.body.aggregations.aggregations;
  return {
    buckets: results.buckets.map(bucket => {
      return { key: bucket.key, docCount: bucket.doc_count };
    }),
    field,
  };
};
export default fetchAggregations;
