/*
  Remove the current field from query, allowing for disjointive facets
*/
const clearCurrentField = (query: any, field: string) => {
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
export default clearCurrentField;
