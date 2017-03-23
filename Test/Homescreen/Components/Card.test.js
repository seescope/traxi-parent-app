import { getRows } from '../../../App/Homescreen/Components/Card';

it('only returns two rows if not expanded', () => {
  const testData = [1, 2, 3, 4];

  expect(getRows(testData, false).length).toEqual(2);
  expect(getRows(testData, true).length).toEqual(4);
});
