import getNestedFields from './getNestedFields';

test('getNestedFields - Receive an empty query', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {};
  const response = getNestedFields(sourceQuery);
  const expectedResponse = [];
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('getNestedFields - Receive a query without nested fields', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      { op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } },
    ],
  };
  const response = getNestedFields(sourceQuery);
  const expectedResponse = [];
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('getNestedFields - Receive a query with one nested fields', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      {
        op: 'in',
        content: { field: 'nested.edges.node.field', value: ['anotherkey'] },
      },
    ],
  };
  const response = getNestedFields(sourceQuery);
  const expectedResponse = ['nested.edges'];
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('getNestedFields - Receive a query with two nested fields', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {
    op: 'and',
    content: [
      { op: 'in', content: { field: 'myA.field', value: ['akey'] } },
      {
        op: 'in',
        content: { field: 'nested.edges.node.field', value: ['anotherkey'] },
      },
      { op: 'in', content: { field: 'myB.field', value: ['akey'] } },
      { op: 'in', content: { field: 'myC.field', value: ['akey'] } },
      {
        op: 'in',
        content: { field: 'nestedB.edges.node.field', value: ['akey'] },
      },
    ],
  };
  const response = getNestedFields(sourceQuery);
  const expectedResponse = ['nested.edges', 'nestedB.edges'];
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
