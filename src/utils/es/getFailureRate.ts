import { convertSqonToEs } from '../query';
import { ApiResponse } from '@elastic/elasticsearch';

export const getFailureRate = async (esClient, esIndex, dateInterval, field, datefield, buckets, query) => {
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
                field: datefield,
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
};

export default getFailureRate;
