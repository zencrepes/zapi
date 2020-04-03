import { Client, ApiResponse } from '@elastic/elasticsearch';

import { buildQuery } from '@arranger/middleware';

const fetchItems = async (from, size, query, orderBy) => {
  console.log(query);
  const prepQuery = {
    nestedFields: ['labels.edges'],
    filters: JSON.parse(query),
  };
  let updatedQuery = await buildQuery(prepQuery);
  if (Object.entries(updatedQuery).length === 0) {
    updatedQuery = {
      match_all: {},
    };
  }

  console.log('Query Transformation: ');
  console.log(query);
  console.log(JSON.stringify(updatedQuery));

  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
  const datasets: ApiResponse = await esClient.search({
    index: 'gh_prs_',
    body: {
      from: from === undefined ? 0 : from,
      size: from === undefined ? 10 : size,
      query: updatedQuery,
    },
  });
  const results = datasets.body.hits;
  return {
    nodes: results.hits.map(hit => hit._source),
    totalCount: results.total.value,
  };
};
export default fetchItems;
