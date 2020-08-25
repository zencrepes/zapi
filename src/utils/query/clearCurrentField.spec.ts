import { clearCurrentField } from './index';

test('clearCurrentField - Receive an empty query', () => {
  /*
    This test verifies that it is possible to add one filter to a previously empty query.
  */
  const sourceQuery = {};
  const response = clearCurrentField(sourceQuery, 'myA.field');
  const expectedResponse = {};
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('clearCurrentField - Receive a query that does not containg the field to be removed', () => {
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
  const response = clearCurrentField(sourceQuery, 'nonexisting.field');
  const expectedResponse = sourceQuery;
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});

test('clearCurrentField - Receive a query that does containg the field to be removed', () => {
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
  const response = clearCurrentField(sourceQuery, 'myA.field');
  const expectedResponse = {
    op: 'and',
    content: [{ op: 'in', content: { field: 'myB.field', value: ['anotherkey'] } }],
  };
  expect(JSON.stringify(response)).toEqual(JSON.stringify(expectedResponse));
});
