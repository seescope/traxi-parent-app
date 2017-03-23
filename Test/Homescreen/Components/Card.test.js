import { getRows } from '../../../App/Homescreen/Components/Card';

it('only returns two rows if not expanded', () => {
  const testData = [1, 2, 3, 4];

  expect(getRows(testData, false).length).toEqual(2);
  expect(getRows(testData, true).length).toEqual(4);
});

it('returns the correct time period', () => {
  const testData = {
    today: [1, 2, 3, 4],
    yesterday: [1, 2],
  };

  expect(getRows(testData, true, 'today').length).toEqual(4);
});
