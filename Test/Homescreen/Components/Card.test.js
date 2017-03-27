import { getRows, getMax } from '../../../App/Dashboard/Components/Card';

describe('#getRows', () => {
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
});

describe('#getMax', () => {
  it('finds the highest value in a data set', () => {
    const topCategories = [
      {
        name: 'Games',
        minutesUsed: 57,
      },
      {
        name: 'Tools',
        minutesUsed: 23,
      },
    ];

    const max = getMax(topCategories);
    expect(max).toEqual(57);
  });
});
