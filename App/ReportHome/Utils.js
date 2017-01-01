import {
  TRAIL_MORNING,
  TRAIL_AFTERNOON,
  TRAIL_EVENING,
  BAD,
} from '../Constants/Colours';

const trailColours = {
  Morning: TRAIL_MORNING,
  Afternoon: TRAIL_AFTERNOON,
  Evening: TRAIL_EVENING,
  'Late Night': BAD,
};

// KR: Colours go from top to bottom. :- )
export const getTrailColours = (trailSegments, index) => {
  const thisSegment = trailSegments[index];
  const nextSegment = trailSegments[index + 1];
  const previousSegment = trailSegments[index - 1];

  if (trailSegments.length === 1) {
    const colour = trailColours[thisSegment.name];
    return [colour, colour];
  }

  // This is like, early hours of the morning late night.
  if (thisSegment.name === 'Late Night' && index === 0) {
    const endColour = trailColours[nextSegment.name];
    return [BAD, endColour];
  }

  if (thisSegment.name === 'Evening') {
    const segmentName = nextSegment ? nextSegment.name : 'Evening';
    const endColour = trailColours[segmentName];
    return [TRAIL_EVENING, endColour];
  }

  if (thisSegment.name === 'Afternoon') {
    return [TRAIL_AFTERNOON, TRAIL_AFTERNOON];
  }

  if (thisSegment.name === 'Morning') {
    const startColour = previousSegment ? trailColours[previousSegment.name] : TRAIL_MORNING;
    return [startColour, TRAIL_MORNING];
  }

  // This is like, early hours of the morning late night.
  if (thisSegment.name === 'Late Night' && index !== 0) {
    const startColour = trailColours[previousSegment.name];
    return [startColour, BAD];
  }


  console.log('Weird:', thisSegment.name, index);
  const colour = trailColours[thisSegment.name];
  return [colour, colour];
};
