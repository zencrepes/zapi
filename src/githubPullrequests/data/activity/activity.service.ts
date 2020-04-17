import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { buildQuery } from '@arranger/middleware';

import { getNestedFields } from '../../../utils/query';
import { clearCurrentField } from '../../../utils/query';
import { addFilterToQuery } from '../../../utils/query';
import { createTermFilter } from '../../../utils/query';
import { getTermAggregation } from '../../../utils/es/getTermAggregation';
import { getDateHistogramAggregation } from '../../../utils/es/getDateHistogramAggregation';

// This might not be ideal, but fetching the entire dataset before proceeding
// const dataset = await fetchRecursive(
//   this.esClient,
//   0,
//   500,
//   updatedQuery,
//   [],
//   field,
//   dateField,
// );
// const fetchRecursive = async (
//   esClient,
//   from,
//   size,
//   query,
//   dataset,
//   field,
//   dateField,
// ) => {
//   const sortField = [{}];
//   sortField[0][dateField] = 'asc';
//   const newData: ApiResponse = await esClient.search({
//     index: 'gh_prs_',
//     body: {
//       from: from === undefined ? 0 : from,
//       size: from === undefined ? 10 : size,
//       sort: sortField,
//       _source: ['id', 'title', dateField, field],
//       query: query,
//     },
//   });
//   const results = newData.body.hits.hits;
//   const totalHits = newData.body.hits.total.value;
//   for (const hit of results) {
//     dataset.push(hit);
//   }
//   if (dataset.length < totalHits) {
//     await fetchRecursive(
//       esClient,
//       from + size,
//       size,
//       query,
//       dataset,
//       field,
//       dateField,
//     );
//   }
//   return dataset;
// };

@Injectable()
export default class DataActivityService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async getActivity(
    dateField: string,
    field: string,
    query: any,
  ): Promise<any> {
    const filterQuery = JSON.parse(query);

    const results = await getTermAggregation(
      this.esClient,
      'gh_prs_',
      filterQuery,
      field,
      false,
    );
    const bucketsResults = [];
    // let firstWeek = startOfWeek(new Date()).toISOString();
    // let lastWeek = startOfWeek(new Date()).toISOString();
    let fromWeekStart = null;
    let toWeekStart = null;
    for (const bucket of results.buckets) {
      const filter = createTermFilter('=', field, bucket.key);
      const updatedQuery = addFilterToQuery(filter, filterQuery);
      const aggregationResult = await getDateHistogramAggregation(
        this.esClient,
        'gh_prs_',
        updatedQuery,
        dateField,
        JSON.stringify({ calendar_interval: 'week' }),
      );
      // console.log(aggregationResult);
      bucketsResults.push({
        ...bucket,
        weeks: aggregationResult.buckets
          .filter((w: any) => w.docCount > 0)
          .map((w: any) => {
            if (fromWeekStart === null) {
              fromWeekStart = w.keyAsString;
            } else if (new Date(fromWeekStart) > new Date(w.keyAsString)) {
              fromWeekStart = w.keyAsString;
            }
            if (toWeekStart === null) {
              toWeekStart = w.keyAsString;
            } else if (new Date(toWeekStart) < new Date(w.keyAsString)) {
              toWeekStart = w.keyAsString;
            }
            return { weekStart: w.keyAsString, docCount: w.docCount };
          }),
      });
    }

    return {
      buckets: bucketsResults,
      fromWeekStart,
      toWeekStart,
    };
  }
}
