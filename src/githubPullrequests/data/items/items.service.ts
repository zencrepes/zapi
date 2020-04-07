import { Client, ApiResponse } from '@elastic/elasticsearch';

import { buildQuery } from '@arranger/middleware';

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

const fetchItems = async (from, size, query, orderBy) => {
  // console.log(query);

  // Check if build query contains any nested fields, this can be detected through the presence of 'edges'
  const nestedFields =
    Object.keys(JSON.parse(query)).length > 0
      ? getNestedFields(JSON.parse(query))
      : [];
  const prepQuery = {
    nestedFields,
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
