import { getBarWidth, getBarColour } from '../../../App/Dashboard/Components/Bar';

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

describe('#getBarColour', () => {
  it('gets the correct colour for a bar', () => {
    const max = 100;
    const val = 50;
    const expectedColor = 'hsl(218, 75%, 63%)';

    const color = getBarColour(max, val);
    expect(color).toEqual(expectedColor);
  });
});
