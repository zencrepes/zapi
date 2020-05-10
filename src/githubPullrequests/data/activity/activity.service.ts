import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { addFilterToQuery } from '../../../utils/query';
import { createTermFilter } from '../../../utils/query';
import { getTermAggregation } from '../../../utils/es/getTermAggregation';
import { getDateHistogramAggregation } from '../../../utils/es/getDateHistogramAggregation';

@Injectable()
export default class DataActivityService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async getActivity(dateField: string, field: string, query: any): Promise<any> {
    const filterQuery = JSON.parse(query);

    const results = await getTermAggregation(this.esClient, 'gh_prs_', filterQuery, field, {}, false);
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
        // eslint-disable-next-line @typescript-eslint/camelcase
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
