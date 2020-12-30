import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@elastic/elasticsearch';

import { EsClientService } from '../../../esClient.service';
import { ConfService } from '../../../conf.service';

import { convertSqonToEs } from '../../../utils/query';

@Injectable()
export default class DataFailureRateService {
  constructor(private readonly confService: ConfService, private readonly esClientService: EsClientService) {}

  async getFailureRate(dateInterval: string, field: string, buckets: number, query: any): Promise<any> {
    const userConfig = this.confService.getUserConfig();

    const esClient = this.esClientService.getEsClient();
    const filterQuery = JSON.parse(query);

    const convertedQuery = await convertSqonToEs(filterQuery);

    const datasets: ApiResponse = await esClient.search({
      index: userConfig.elasticsearch.dataIndices.bambooRuns + '*',
      size: 0,
      body: {
        query: convertedQuery,
        aggs: {
          aggregations: {
            terms: {
              field: field,
              size: buckets,
              order: { runFailureRate: 'desc' }
            },
            aggs: {
              runFailureRate: {
                avg: {
                  field: 'runFailureRate',
                  missing: -1
                }
              },
              runTotal: {
                sum: {
                  field: 'runTotal',
                  missing: -1
                }
              },
              runTotalAvg: {
                avg: {
                  field: 'runTotal',
                  missing: -1
                }
              },
              histogram: {
                date_histogram: {
                  field: 'startedAt',
                  calendar_interval: dateInterval
                },
                aggs: {
                  runFailureRate: {
                    avg: {
                      field: 'runFailureRate',
                      missing: -1
                    }
                  },
                  runTotal: {
                    sum: {
                      field: 'runTotal',
                      missing: -1
                    }
                  },
                  runTotalAvg: {
                    avg: {
                      field: 'runTotal',
                      missing: -1
                    }
                  },                  
                }
              }
            }
          }       
        },
      },
    });
    let fromDateStart: Date = new Date();
    let toDateStart: Date = new Date(0);
    const fullDataset = datasets.body.aggregations.aggregations.buckets.map((b: any) => {
        return {
          ...b,
          key: b.key,
          docCount: b.doc_count,
          runFailureRate: Math.round(b.runFailureRate.value),
          runTotal: Math.round(b.runTotal.value),
          runTotalAvg: Math.round(b.runTotalAvg.value),
          buckets: b.histogram.buckets.map((bd: any) => {
            // console.log(bd)
            if (new Date(bd.key_as_string) < fromDateStart) {
              fromDateStart = new Date(bd.key_as_string);
            }
            if (new Date(bd.key_as_string) > toDateStart) {
              toDateStart = new Date(bd.key_as_string);
            }            
            return {
              ...bd,
              dateStart: bd.key_as_string,
              docCount: bd.doc_count,
              runFailureRate: Math.round(bd.runFailureRate.value),
              runTotal: Math.round(bd.runTotal.value),
              runTotalAvg: Math.round(bd.runTotalAvg.value),
            }
          })
        }
      })

    return {
      buckets: fullDataset,
      fromDateStart: fromDateStart.toISOString(),
      toDateStart: toDateStart.toISOString(),
    }
  }
}
