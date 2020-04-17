import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { getTermAggregation } from '../../../utils/es/getTermAggregation';
import { getDateHistogramAggregation } from '../../../utils/es/getDateHistogramAggregation';

@Injectable()
export default class DataAggregationsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(
    field: string,
    query: any,
    aggType: string,
    aggOptions: string,
  ): Promise<any> {
    let filterQuery = JSON.parse(query);
    // let aggOptions = JSON.parse(options);
    const aggregationType = aggType === undefined ? 'term' : aggType;
    const aggregationOptions =
      aggOptions === undefined ? {} : JSON.parse(aggOptions);

    if (aggregationType === 'term') {
      return await getTermAggregation(
        this.esClient,
        'gh_prs_',
        filterQuery,
        field,
        true,
      );
    }

    if (aggregationType === 'date_histogram') {
      return await getDateHistogramAggregation(
        this.esClient,
        'gh_prs_',
        filterQuery,
        field,
        aggregationOptions,
      );
    }
  }
}
