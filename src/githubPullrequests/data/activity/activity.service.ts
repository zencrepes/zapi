import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../../esClient.service';
import { ConfService } from '../../../conf.service';

import { addFilterToQuery } from '../../../utils/query';
import { createTermFilter } from '../../../utils/query';
import { getTermAggregation } from '../../../utils/es/getTermAggregation';
import { getDateHistogramAggregation } from '../../../utils/es/getDateHistogramAggregation';

@Injectable()
export default class DataPrActivityService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  async getActivity(dateField: string, field: string, query: any): Promise<any> {
    const esClient = this.esClientService.getEsClient();
    const userConfig = this.confService.getUserConfig();

    const filterQuery = JSON.parse(query);

    const results = await getTermAggregation(
      esClient,
      userConfig.elasticsearch.dataIndices.githubPullrequests + '*',
      filterQuery,
      field,
      {},
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
        esClient,
        userConfig.elasticsearch.dataIndices.githubPullrequests + '*',
        updatedQuery,
        dateField,
        JSON.stringify({ calendarInterval: 'week' }),
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
