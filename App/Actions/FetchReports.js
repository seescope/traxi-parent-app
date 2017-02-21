import moment from 'moment';
import { AWSDynamoDB } from 'aws-sdk-react-native-dynamodb';
import lodash from 'lodash';

import { logError } from '../Utils';

const METADATA_TABLE_NAME = 'AppMetadata';
const TRAIL_ITEMS_TABLE_NAME = 'TrailItems';

const isLateNight = r => r.timeStamp.hour() < 4 || r.timeStamp.hour() >= 22;

const getLateNightMinutes = reportData =>
  reportData.filter(isLateNight).reduce((acc, r) => acc + r.minutesUsed, 0);

const getDeviceTime = reportData =>
  reportData.reduce((acc, r) => acc + r.minutesUsed, 0);

const getSocialTime = reportData =>
  reportData
    .filter(r => r.category === 'Social')
    .reduce((acc, r) => acc + r.minutesUsed, 0);

const buildCircles = data => {
  const lateNightTimes = getLateNightMinutes(data);
  const deviceTime = getDeviceTime(data);
  const socialTime = getSocialTime(data);

  return [
    {
      name: 'Late Night',
      status: lateNightTimes > 1 ? 'bad' : 'good',
      minutesUsed: lateNightTimes,
    },
    {
      name: 'Device Time',
      status: deviceTime > 120 ? 'bad' : 'good',
      minutesUsed: deviceTime,
    },
    {
      name: 'Social Time',
      status: socialTime > 60 ? 'bad' : 'good',
      minutesUsed: socialTime,
    },
  ];
};

const buildTrail = data => [
  {
    name: 'Late Night',
    trailItems: data.filter(d => d.timeStamp.hour() >= 22),
  },
  {
    name: 'Evening',
    trailItems: data.filter(
      d => d.timeStamp.hour() >= 17 && d.timeStamp.hour() < 22,
    ),
  },
  {
    name: 'Afternoon',
    trailItems: data.filter(
      d => d.timeStamp.hour() >= 12 && d.timeStamp.hour() < 17,
    ),
  },
  {
    name: 'Morning',
    trailItems: data.filter(
      d => d.timeStamp.hour() >= 4 && d.timeStamp.hour() < 12,
    ),
  },
  {
    name: 'Late Night',
    trailItems: data.filter(d => d.timeStamp.hour() < 4),
  },
].filter(t => t.trailItems.length > 0);

const cleanDynamoDBResponse = data => {
  if (!data.Items || data.Items.length === 0)
    throw new Error('No data received from DynamoDB');

  return data.Items.map(entry => ({
    timeStamp: moment(entry.StartTime.S).local(),
    minutesUsed: parseInt(entry.MinutesUsed.N, 10),
    appHash: entry.AppHash.S,
  }));
};

const groupByDate = (accumulator, data) => {
  const date = data.timeStamp.format('YYYY-MM-DD');
  const dateArray = accumulator[date] || [];
  return {
    ...accumulator,
    [date]: [data, ...dateArray],
  };
};

const buildReport = (accumulator, data, date) => ({
  ...accumulator,
  [date]: {
    circles: buildCircles(data),
    trail: buildTrail(data),
  },
});

const getAppHashKeys = data => lodash
  .chain(data)
  .map('appHash')
  .uniq()
  .map(appHash => ({
    AppHash: {
      S: appHash,
    },
  }))
  .value();

const reduceMetadata = (accumulator, metadataItem) => {
  if (!metadataItem.Logo || !metadataItem.Name || !metadataItem.Category)
    return accumulator;
  const appHash = metadataItem.AppHash.S;
  const parsedMetadataItem = {
    logo: metadataItem.Logo.S,
    name: metadataItem.Name.S,
    category: metadataItem.Category.S,
  };

  return {
    ...accumulator,
    [appHash]: parsedMetadataItem,
  };
};

const parseMetadata = metadata => {
  if (!metadata.Responses[METADATA_TABLE_NAME])
    throw new Error('No data received from DynamoDB');
  return metadata.Responses[METADATA_TABLE_NAME].reduce(reduceMetadata, {});
};

const enrichWithMetadata = parsedMetadata => trailItem => {
  const appMetadata = parsedMetadata[trailItem.appHash];

  if (!appMetadata) {
    // console.log('No data', trailItem.appHash);
    return null;
  }

  return {
    ...trailItem,
    name: appMetadata.name,
    logo: appMetadata.logo,
    category: appMetadata.category,
  };
};

const getUpdatedMinutesUsed = (lastTrailItem, trailItem) => {
  const lastTrailItemEnd = lastTrailItem.timeStamp
    .clone()
    .add(lastTrailItem.minutesUsed, 'minutes');
  const trailItemEnd = trailItem.timeStamp
    .clone()
    .clone()
    .add(trailItem.minutesUsed, 'minutes');

  const delta = moment
    .duration(trailItemEnd.diff(lastTrailItemEnd))
    .asMinutes();

  const normalisedDelta = delta > 0 ? delta : 0;

  return Math.round(lastTrailItem.minutesUsed + normalisedDelta);
};

const FUZINESS = {
  Entertainment: 10,
  Games: 10,
};

export const isOverlapping = (secondTrailItem, lastTrailItem) => {
  if (lastTrailItem.name !== secondTrailItem.name) return false;

  const startTime = lastTrailItem.timeStamp;
  const fuzziness = FUZINESS[lastTrailItem.category] || 1;
  const endTime = startTime
    .clone()
    .add(lastTrailItem.minutesUsed + fuzziness, 'minutes');

  const secondTrailItemStart = secondTrailItem.timeStamp;
  const result = secondTrailItemStart.isBetween(startTime, endTime, '()');

  return result;
};

export const coalesceApps = (accumulator, trailItem) => {
  const overlappingIndex = lodash.findIndex(
    accumulator,
    isOverlapping.bind(undefined, trailItem),
  );

  if (overlappingIndex === -1) {
    return [...accumulator, trailItem];
  }

  const overlappingItem = accumulator[overlappingIndex];
  const updatedMinutesUsed = getUpdatedMinutesUsed(overlappingItem, trailItem);
  const newTrailItem = {
    ...overlappingItem,
    minutesUsed: updatedMinutesUsed,
  };

  return [
    ...accumulator.slice(0, overlappingIndex),
    newTrailItem,
    ...accumulator.slice(overlappingIndex + 1),
  ];
};

const dateComparator = (date1, date2) =>
  date1.toString() < date2.toString() ? -1 : 1;

const getAppMetadata = data => {
  const appHashKeys = getAppHashKeys(data);
  return AWSDynamoDB
    // eslint-disable-next-line
    .BatchGetItem({
      RequestItems: {
        [METADATA_TABLE_NAME]: {
          Keys: appHashKeys,
        },
      },
    })
    .then(response => {
      const parsedMetadata = parseMetadata(response);
      const result = data
        .map(enrichWithMetadata(parsedMetadata))
        .filter(i => i !== null)
        .sort(dateComparator)
        .reduce(coalesceApps, []);

      if (result.length === 0)
        throw new Error('No trail items with known metadata');

      return result;
    });
};

export const parseReport = data => {
  if (data === null || data.length === 0) {
    throw new Error(
      `Invalid data passed to parseReport: ${JSON.stringify(data)}`,
    );
  }

  return lodash
    .chain(data)
    .reduce(groupByDate, {})
    .reduce(buildReport, {})
    .value();
};

const getReportForKid = kid => {
  const { UUID } = kid;
  const startDate = moment();
  startDate.subtract(7, 'days');
  const queryRequest = {
    TableName: TRAIL_ITEMS_TABLE_NAME,
    IndexName: 'UUID-StartTime-index',
    KeyConditionExpression: '#U=:uuid AND #T >= :time',
    ExpressionAttributeNames: {
      '#U': 'UUID',
      '#T': 'StartTime',
    },
    ExpressionAttributeValues: {
      ':uuid': { S: UUID },
      ':time': { S: startDate.utc().format('YYYY-MM-DD') },
    },
    ProjectionExpression: 'StartTime, MinutesUsed, AppHash',
  };

  // eslint-disable-next-line
  return AWSDynamoDB.Query(queryRequest);
};

const fetchReports = kid => dispatch => {
  dispatch({ type: 'FETCHING_REPORT' });

  return getReportForKid(kid)
    .then(cleanDynamoDBResponse)
    .then(getAppMetadata)
    .then(reportData => {
      const report = parseReport(reportData);

      dispatch({
        type: 'FETCHED_REPORT',
        report,
        UUID: kid.UUID,
      });
    })
    .catch(e => {
      dispatch({
        type: 'FETCHED_REPORT',
        report: {},
      });
      logError(`Error fetching reports for ${kid.UUID}: ${e.message}`);
    });
};

export default fetchReports;
