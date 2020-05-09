import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { getTermAggregation } from '../../es/getTermAggregation';
import { getDateHistogramAggregation } from '../../es/getDateHistogramAggregation';
import { getDateHistogramRollingAggregation } from '../../es/getDateHistogramRollingAggregation';

@Injectable()
export default class DataAggregationsService {
  constructor(private readonly esClient: ElasticsearchService) {}

  async findAll(field: string, query: any, aggType: string, aggOptions: string, esIndex: string): Promise<any> {
    const filterQuery = JSON.parse(query);
    // let aggOptions = JSON.parse(options);
    const aggregationType = aggType === undefined ? 'term' : aggType;
    const aggregationOptions = aggOptions === undefined ? {} : JSON.parse(aggOptions);

    if (aggregationType === 'term') {
      return await getTermAggregation(this.esClient, esIndex, filterQuery, field, true);
    }

    if (aggregationType === 'date_histogram') {
      return await getDateHistogramAggregation(this.esClient, esIndex, filterQuery, field, aggregationOptions);
    }

    if (aggregationType === 'date_histogram_rolling') {
      return await getDateHistogramRollingAggregation(this.esClient, esIndex, filterQuery, field, aggregationOptions);
    }
  }
}
