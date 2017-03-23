import { getBarWidth } from '../../../App/Homescreen/Components/Bar';

describe('#getBarWidth', () => {
  it('gets the correct width for a bar', () => {
    const max = 100;
    const val = 50;
    const maxWidth = 200;
    const expectedWidth = 100;

    const barWidth = getBarWidth(max, val, maxWidth);
    expect(barWidth).toEqual(expectedWidth);
  });
});
