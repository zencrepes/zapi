import { convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getFailureRateCases = async (esClient, esIndex, dateInterval, field, datefield, buckets, query) => {
  const filterQuery = JSON.parse(query);

  const convertedQuery = await convertSqonToEs(filterQuery);

  const datasets: ApiResponse = await esClient.search({
    index: esIndex,
    size: 0,
    body: {
      query: convertedQuery,
      aggs: {
        aggregations: {
          terms: {
            field: field,
            size: buckets,
            order: { caseFailureRate: 'desc' }
          },
          aggs: {
            caseFailureRate: {
              avg: {
                field: 'caseFailureRate',
                missing: -1
              }
            },
            caseTotal: {
              sum: {
                field: 'caseTotal',
                missing: -1
              }
            },
            caseTotalAvg: {
              avg: {
                field: 'caseTotal',
                missing: -1
              }
            },
            histogram: {
              date_histogram: {
                field: datefield,
                calendar_interval: dateInterval
              },
              aggs: {
                caseFailureRate: {
                  avg: {
                    field: 'caseFailureRate',
                    missing: -1
                  }
                },
                caseTotal: {
                  sum: {
                    field: 'caseTotal',
                    missing: -1
                  }
                },
                caseTotalAvg: {
                  avg: {
                    field: 'caseTotal',
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
        caseFailureRate: Math.round(b.caseFailureRate.value),
        caseTotal: Math.round(b.caseTotal.value),
        caseTotalAvg: Math.round(b.caseTotalAvg.value),
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
            caseFailureRate: Math.round(bd.caseFailureRate.value),
            caseTotal: Math.round(bd.caseTotal.value),
            caseTotalAvg: Math.round(bd.caseTotalAvg.value),
          }
        })
      }
    })

  return {
    buckets: fullDataset,
    fromDateStart: fromDateStart.toISOString(),
    toDateStart: toDateStart.toISOString(),
  }
};

export default getFailureRateCases;
