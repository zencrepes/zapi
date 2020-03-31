import { Client, ApiResponse } from '@elastic/elasticsearch';

const fetchItems = async (from, size, query, orderBy) => {
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
  const datasets: ApiResponse = await esClient.search({
    index: 'gh_prs_',
    body: {
      from: from === undefined ? 0 : from,
      size: from === undefined ? 10 : size,
      query: {
        match_all: {},
      },
    },
  });
  const results = datasets.body.hits;
  return {
    nodes: results.hits.map(hit => hit._source),
    totalCount: results.total.value,
  };
};
export default fetchItems;
