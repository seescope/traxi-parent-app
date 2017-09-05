/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import lodash from 'lodash';
import moment from 'moment';
import * as Firebase from 'firebase';
import {
  Dimensions,
  BackAndroid,
  Linking,
  AsyncStorage,
  Platform,
} from 'react-native';
import { Crashlytics } from 'react-native-fabric';
import Analytics from 'react-native-analytics';
import { Actions } from 'react-native-router-flux';

export const firstName = name => name && name.split(' ')[0];

export const relativeDate = inputDate => {
  const date = moment(inputDate);

  if (date.isSame(moment(), 'day')) {
    return 'Today';
  }

  const lastNight = moment().subtract(1, 'days');

  if (date.isSame(lastNight, 'day')) {
    return 'Yesterday';
  }

  return date.format('dddd');
};

export const timeRange = inputHour => {
  const hour = moment(inputHour, 'hhA');
  const nextHour = hour.clone();
  nextHour.add(1, 'hour');

  return `${hour.format('hA')} to ${nextHour.format('hA')}`;
};

export const isIOS = Platform.OS === 'ios';

export const listOfNumbers = length => {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }

  return list;
};

const niceNames = {
  'Maps - Navigation & Transit': 'Google Maps',
  'Chrome Browser - Google': 'Chrome',
};

export const getAppNiceName = name => niceNames[name] || name;

export const isToday = date => moment(date).isSame(moment(), 'day');

export const logError = error => {
  const errorString = error.toString();
  console.error(errorString); // eslint-disable-line

  if (isIOS) {
    Crashlytics.recordError(errorString);
  } else {
    Crashlytics.logException(errorString);
  }
};

export const loggingMiddleware = store =>
  next =>
    action => {
      if (!isIOS) {
        console.log(JSON.stringify(action));
      }
      Crashlytics.log(JSON.stringify(action));
      Crashlytics.log(JSON.stringify(store));

      return next(action);
    };

export const sendPhoneNumberToSlack = phoneNumber =>
  fetch(
    'https://hooks.slack.com/services/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',
    {
      method: 'POST',
      body: JSON.stringify({
        text: `Reminder received! ${phoneNumber}`,
      }),
    }
  )
    .then(res => res.text())
    .then(body => {
      if (body !== 'ok') {
        throw new Error(`Error posting to Slack: ${body}`);
      }
    });

export const getNiceUsage = usage =>
  moment.duration(usage, 'minutes').humanize();

const getUUIDFromProfile = profileJSON => {
  if (!profileJSON) return null;

  const profile = JSON.parse(profileJSON);
  if (!profile || !profile.UUID) return null;
  const { UUID } = profile;

  return { UUID, deeplink: false };
};

const parseURL = URL => {
  if (!URL) return null;
  const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  const match = URL.match(UUID_REGEX);

  return match && match[0];
};

export const getUUIDFromDeeplink = () => Linking.getInitialURL().then(parseURL);

export const getUUID = () =>
  AsyncStorage.getItem('profile').then(profileJSON => {
    const UUIDFromProfile = getUUIDFromProfile(profileJSON);

    return UUIDFromProfile || getUUIDFromDeeplink();
  });

export const getProfile = UUID =>
  Firebase.database()
    .ref(`parents/${UUID}/`)
    .once('value')
    .then(snapshot => snapshot.val());

export const cleanObjectForFirebase = object =>
  lodash.omitBy(object, lodash.isNil);

const { height } = Dimensions.get('window');
export const isSmallScreen = height < 481;
