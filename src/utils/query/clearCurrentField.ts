/*
  Remove the current field from query, allowing for disjointive facets
*/
const clearCurrentField = (query: any, field: string, tag?: string | undefined) => {
  if (Object.keys(query).length === 0) {
    return query;
  }

  // if (field === 'labels.edges.node.name.keyword') {
  //   console.log('---');
  //   console.log('Query In: ' + JSON.stringify(query));
  //   console.log('Field: ' + field);
  //   console.log('tag: ' + tag);
  //   console.log(
  //     'Query Out: ' +
  //       JSON.stringify(
  //         query.content.filter(
  //           (filter: any) =>
  //             filter.content.field !== field ||
  //             (filter.content.field === field && (filter.tag === undefined || filter.tag !== tag)),
  //         ),
  //       ),
  //   );
  // }

  // Note about: (filter.content.field === field && filter.tag !== undefined)
  // ZenCrepes support some tag mechanism to allow a particular logic to be applied separately from the main query logic.
  // This allow for filtering on things like labels that might contain many types of content.
  // For example, you might want to filter all tickets with priority either Critical or Major, but only tickets in sprint 1
  // This would result in this logic: Critical OR priority: Major) AND sprint: 1
  // `sprint:1` will be considered a tag (just for the point of differentiating it from the rest of the query).
  return {
    ...query,
    content: query.content.filter(
      (filter: any) =>
        filter.content.field !== field ||
        (filter.content.field === field && (filter.tag !== undefined || filter.tag !== tag)),
    ),
  };
};
export default clearCurrentField;
