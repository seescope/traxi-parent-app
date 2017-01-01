/* eslint no-unused-vars: ["error", {"args": "none"}] */

import moment from 'moment';
import { Platform } from 'react-native';
import { Crashlytics } from 'react-native-fabric';
import Analytics from 'react-native-analytics';

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

export const isIOS = (Platform.OS === 'ios');

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
  console.error(error);
  return (isIOS ?
    Crashlytics.recordError(error.toString()) :
    Crashlytics.logException(error.toString()));
};

export const loggingMiddleware = store => next => action => {
  Crashlytics.log(JSON.stringify(action));
  Crashlytics.log(JSON.stringify(store));

  return next(action);
};

export const trackingMiddleware = store => next => action => {
  // If this isn't a screen change, we're not interested.
  if (action.type !== 'REACT_NATIVE_ROUTER_FLUX_PUSH') {
    return next(action);
  }

  // Grab the name of the screen from the flux action.
  const { key } = action;
  Analytics.screen(key);

  return next(action);
};

export const experimentViewed = (variantName) => {
  Analytics.identify({
    price: variantName,
  });
};
