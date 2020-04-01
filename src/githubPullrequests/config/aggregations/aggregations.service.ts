import { Client, ApiResponse } from '@elastic/elasticsearch';

const getAvailableAggregations = async () => {
  const esIndex = 'config';
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });

  const datasets: ApiResponse = await esClient.search({
    index: esIndex,
    body: {
      from: 0,
      size: 200,
      _source: ['facets'],
      query: {
        match_phrase: { id: 'githubPullrequests' },
      },
    },
  });
  const results = datasets.body.hits.hits;

  if (results.length > 0) {
    return {
      nodes: results[0]._source.facets,
      totalCount: results[0]._source.facets.length,
    };
  }
  return { nodes: [], totalCount: 0 };
};
export default getAvailableAggregations;
