import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from './';

/*
  Convert a SQON query to a query that can be passed directly to Elasticsearch
*/
const convertSqonToEs = async (query: any) => {
  const nestedFields =
    Object.keys(query).length > 0 ? getNestedFields(query) : [];
  const prepQuery = {
    nestedFields,
    filters: query,
  };

  let updatedQuery = await buildQuery(prepQuery);
  if (Object.entries(updatedQuery).length === 0) {
    updatedQuery = {
      match_all: {},
    };
  }

  return updatedQuery;
};
export default convertSqonToEs;
