import { getStrokeOffset, getNiceTimeUsed } from '../../../App/Homescreen/Components/KidCircle';

it('returns the correct offset for the circle circumference', () => {
  const testCircumference = 100;
  const testMinutesUsed = 10;

  const offset = getStrokeOffset(testMinutesUsed, testCircumference);

  expect(offset).toEqual(8.333333333333332);
});

it('returns a human friendly amount of time used', () => {
  const testMinutesUsed = 60;
  const hoursUsed = getNiceTimeUsed(testMinutesUsed);

  expect(hoursUsed).toEqual(1);

  const testLessThanAnHour = 30;
  const minutesUsed = getNiceTimeUsed(testLessThanAnHour);

  expect(minutesUsed).toEqual(30);
});
