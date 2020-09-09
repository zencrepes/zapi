import { convertSqonToEs } from './index';

test('Receive an empty query', async () => {
  const sourceQuery = {};
  const response = await convertSqonToEs(sourceQuery);
  const expectedResponse = { match_all: {} };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Receive a query containing a nested field', async () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.edges.node.name', value: ['akey'] } },
      { op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } },
    ],
  };
  const response = await convertSqonToEs(sourceQuery);
  const expectedResponse = {
    bool: {
      must: [
        {
          nested: {
            path: 'myA.edges',
            query: {
              bool: {
                must: [{ terms: { 'myA.edges.node.name': ['akey'], boost: 0 } }],
              },
            },
          },
        },
        { terms: { 'myB.field': ['anotherkey'], boost: 0 } },
      ],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('Receive a query not containing a nested field', async () => {
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      { op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } },
    ],
  };
  const response = await convertSqonToEs(sourceQuery);
  const expectedResponse = {
    bool: {
      must: [{ terms: { 'myA.field': ['akey'], boost: 0 } }, { terms: { 'myB.field': ['anotherkey'], boost: 0 } }],
    },
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
