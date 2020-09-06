/*
    Needed by arranger middleware to deal with nested facets,
    Extracts the nested fields (based on those using '.edges.')
*/
const getNestedFields = (query: any) => {
  if (Object.keys(query).length === 0) {
    return [];
  }
  const availableFields = query.content
    .map((filter: any) => filter.content.field)
    .filter((field: string) => field !== undefined && field.includes('.edges.'));
  if (availableFields.length === 0) {
    return [];
  }
  return availableFields.map((field: string) => field.split('.edges.')[0] + '.edges');
};
export default getNestedFields;
