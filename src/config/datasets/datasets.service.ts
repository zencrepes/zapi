import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ApiResponse } from '@elastic/elasticsearch';

export const fetchItems = async () => {
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
  const datasets: ApiResponse = await esClient.search({
    index: 'datasets',
    body: {
      from: 0,
      size: 10000,
      query: {
        match_all: {},
      },
    },
  });
  const results = datasets.body.hits;
  return {
    nodes: results.hits.map(hit => {
      return { ...hit._source, id: hit._id };
    }),
    totalCount: results.total.value,
  };
};

export const fetchItem = async (id: string) => {
  const esClient = new Client({
    node: 'http://127.0.0.1:9200',
  });
  const datasets: ApiResponse = await esClient.search({
    index: 'datasets',
    body: {
      from: 0,
      size: 10000,
      query: {
        match_all: {},
      },
    },
  });
  const results = datasets.body.hits;

  return results.find(hit => hit.id === id);
};

export default fetchItems;
