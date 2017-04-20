import moment from "moment";
import * as Firebase from "firebase";
import { Linking, AsyncStorage, Platform } from "react-native";
import { Crashlytics } from "react-native-fabric";
import Analytics from "react-native-analytics";
import InAppBilling from "react-native-billing";

export const firstName = name => name && name.split(" ")[0];

export const relativeDate = inputDate => {
  const date = moment(inputDate);

  if (date.isSame(moment(), "day")) {
    return "Today";
  }

  const lastNight = moment().subtract(1, "days");

  if (date.isSame(lastNight, "day")) {
    return "Yesterday";
  }

  return date.format("dddd");
};

export const timeRange = inputHour => {
  const hour = moment(inputHour, "hhA");
  const nextHour = hour.clone();
  nextHour.add(1, "hour");

  return `${hour.format("hA")} to ${nextHour.format("hA")}`;
};

export const isIOS = Platform.OS === "ios";

export const listOfNumbers = length => {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }

  return list;
};

const niceNames = {
  "Maps - Navigation & Transit": "Google Maps",
  "Chrome Browser - Google": "Chrome"
};

export const getAppNiceName = name => niceNames[name] || name;

export const isToday = date => moment(date).isSame(moment(), "day");

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
      Crashlytics.log(JSON.stringify(action));
      Crashlytics.log(JSON.stringify(store));

      return next(action);
    };

/* eslint-disable no-unused-vars */
export const trackingMiddleware = store =>
  next =>
    action => {
      // If this isn't a screen change, we're not interested.
      if (action.type !== "REACT_NATIVE_ROUTER_FLUX_FOCUS") {
        return next(action);
      }

      // Grab the name of the screen from the flux action.
      const { scene } = action;
      Analytics.screen(scene.name);

      return next(action);
    };

export const experimentViewed = variantName => {
  Analytics.identify({
    price: variantName
  });
};

export const handleBilling = price =>
  InAppBilling.open()
    .then(() => InAppBilling.subscribe(price))
    .then(() => InAppBilling.close());

export const sendPhoneNumberToSlack = phoneNumber =>
  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      body: JSON.stringify({
        text: `Reminder received! ${phoneNumber}`
      })
    }
  )
    .then(res => res.text())
    .then(body => {
      if (body !== "ok") {
        throw new Error(`Error posting to Slack: ${body}`);
      }
    });

export const getNiceUsage = usage =>
  moment.duration(usage, "minutes").humanize();

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
  AsyncStorage.getItem("profile").then(profileJSON => {
    const UUIDFromProfile = getUUIDFromProfile(profileJSON);

    return UUIDFromProfile || getUUIDFromDeeplink();
  });

export const getProfile = UUID =>
  Firebase.database()
    .ref(`parents/${UUID}/`)
    .once("value")
    .then(snapshot => snapshot.val());
