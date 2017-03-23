import { getStrokeOffset, getNiceTimeUsed, getNiceTimeUnit } from '../../../App/Homescreen/Components/KidCircle';

it('returns the correct offset for the circle circumference', () => {
  let testminutesUsed = 10;
  let offset = getStrokeOffset(testminutesUsed);
  expect(offset).toEqual(2113.7682570903326); // Don't even ask.

  // If we're more than 120 minutes, just return 0.
  testminutesUsed = 140;
  offset = getStrokeOffset(testminutesUsed);
  expect(offset).toEqual(0);
});

it('returns a human friendly amount of time used', () => {
  const testminutesUsed = 60;
  const hoursUsed = getNiceTimeUsed(testminutesUsed);

  expect(hoursUsed).toEqual('1.0');

  const testLessThanAnhour = 30;
  const minutesUsed = getNiceTimeUsed(testLessThanAnhour);

  expect(minutesUsed).toEqual(30);
});

it('returns a human friendly unit of time used', () => {
  let testminutesUsed = 60;
  let hoursUsed = getNiceTimeUnit(testminutesUsed);

  expect(hoursUsed).toEqual('hour');

  testminutesUsed = 120;
  hoursUsed = getNiceTimeUnit(testminutesUsed);

  expect(hoursUsed).toEqual('hours');

  testminutesUsed = 1;
  hoursUsed = getNiceTimeUnit(testminutesUsed);

  expect(hoursUsed).toEqual('minute');

  testminutesUsed = 2;
  hoursUsed = getNiceTimeUnit(testminutesUsed);

  expect(hoursUsed).toEqual('minutes');
});
