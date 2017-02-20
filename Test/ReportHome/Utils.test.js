import { getTrailColours } from '../../App/ReportHome/Utils';
import {
  TRAIL_MORNING,
  TRAIL_AFTERNOON,
  TRAIL_EVENING,
  BAD,
} from '../../App/Constants/Colours';

const TEST_TRAIL = [
  {
    name: 'Late Night',
    trailItems: [1],
  },
  {
    name: 'Evening',
    trailItems: [1],
  },
  {
    name: 'Afternoon',
    trailItems: [1],
  },
  {
    name: 'Morning',
    trailItems: [1],
  },
  {
    name: 'Late Night',
    trailItems: [1],
  },
];

it('gets trail colours correctly', () => {
  const late_night = getTrailColours(TEST_TRAIL, 0);
  expect(late_night).toEqual(['rgb(244, 67, 54)', TRAIL_EVENING]);

  const evening = getTrailColours(TEST_TRAIL, 1);
  expect(evening).toEqual([TRAIL_EVENING, TRAIL_AFTERNOON]);

  const afternoon = getTrailColours(TEST_TRAIL, 2);
  expect(afternoon).toEqual([TRAIL_AFTERNOON, TRAIL_AFTERNOON]);

  const morning = getTrailColours(TEST_TRAIL, 3);
  expect(morning).toEqual([TRAIL_AFTERNOON, TRAIL_MORNING]);

  const late_night_morning = getTrailColours(TEST_TRAIL, 4);
  expect(late_night_morning).toEqual([TRAIL_MORNING, BAD]);
});
