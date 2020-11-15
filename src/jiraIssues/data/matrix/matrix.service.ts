import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../../esClient.service';
import { ConfService } from '../../../conf.service';

import { addFilterToQuery } from '../../../utils/query';
import { createTermFilter } from '../../../utils/query';
import { getTermAggregation } from '../../../utils/es/getTermAggregation';
import { getDateHistogramAggregation } from '../../../utils/es/getDateHistogramAggregation';

@Injectable()
export default class JiraDataMatrixService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  async getMatrix(dateField: string, field: string, query: any, aggOptions: any): Promise<any> {
    const userConfig = this.confService.getUserConfig();

    const esClient = this.esClientService.getEsClient();

    const filterQuery = JSON.parse(query);

    const aggregationOptions = aggOptions === undefined ? {} : JSON.parse(aggOptions);

    const results = await getTermAggregation(
      esClient,
      userConfig.elasticsearch.dataIndices.jiraIssues + '*',
      filterQuery,
      field,
      aggregationOptions,
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
        userConfig.elasticsearch.dataIndices.jiraIssues + '*',
        updatedQuery,
        dateField,
        { calendarInterval: 'week', sumField: 'points' },
      );
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
            return { weekStart: w.keyAsString, docCount: w.docCount, sum: w.sum };
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
