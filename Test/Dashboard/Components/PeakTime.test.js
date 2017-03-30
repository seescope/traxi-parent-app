import { getNiceName } from '../../../App/Dashboard/Components/PeakTime';

it('gets a nice name for a time range', () => {
  const niceName = getNiceName('15');
  expect(niceName).toEqual('3PM - 4PM');
});
