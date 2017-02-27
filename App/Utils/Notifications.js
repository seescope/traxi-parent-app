/* eslint-disable new-cap */

import { AsyncStorage } from 'react-native';

import PushNotification from 'react-native-push-notification';
import { AWSCognitoCredentials } from 'aws-sdk-react-native-core';
import { AWSSNS } from 'aws-sdk-react-native-sns';
import { isIOS } from '../Utils';

const COGNITO_REGION = 'ap-southeast-2';
const IDENTITY_POOL_ID = 'ap-southeast-2:a9998d71-cdf3-474f-a337-9c12289c833c';

const SNS_REGION = 'ap-southeast-2';
let PLATFORM_ARN;
if (isIOS) {
  PLATFORM_ARN = 'arn:aws:sns:ap-southeast-2:387118107985:app/APNS_SANDBOX/traxi';
} else {
  PLATFORM_ARN = 'arn:aws:sns:ap-southeast-2:387118107985:app/GCM/traxi-android';
}

const getData = async name => {
  try {
    const data = await AsyncStorage.getItem(name);

    if (data !== null) {
      return data;
    }
  } catch (error) {
    // Error
  }
  return false;
};

const storeData = async (data, name) => {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (error) {
    // Error
  }
};

const createEndpoint = async (token, data) => {
  const params = {
    PlatformApplicationArn: PLATFORM_ARN,
    Token: token,
    CustomUserData: data,
  };

  try {
    const response = await AWSSNS.CreatePlatformEndpoint(params);
    storeData(response.EndpointArn, 'endpointArn');
  } catch (e) {
    // Error
  }
};

const updateEndpoint = async (endpointArn, token, data) => {
  const params = {
    EndpointArn: endpointArn,
    Attributes: {
      Token: token,
      Enabled: 'true',
      CustomUserData: data,
    },
  };

  try {
    await AWSSNS.SetEndpointAttributes(params);
  } catch (e) {
    // Error
  }
};

export const configureNotificationEndpoint = async profile => {
  const token = await getData('notificationToken');

  const { kids } = profile;

  const kidsInformations = kids.map(kid => ({
    name: kid.name,
    uuid: kid.UUID,
  }));

  const data = {
    kids: kidsInformations,
    timezone: 'US',
  };

  const dataJson = JSON.stringify(data);

  if (token) {
    try {
      await AWSCognitoCredentials.initWithOptions({
        region: COGNITO_REGION,
        identity_pool_id: IDENTITY_POOL_ID,
      });
      await AWSSNS.initWithOptions({ region: SNS_REGION });

      const endpointArn = await getData('endpointArn');

      if (endpointArn) {
        try {
          const response = await AWSSNS.GetEndpointAttributes({
            EndpointArn: endpointArn,
          });

          if (
            response.Attributes.Enabled !== 'true' ||
            response.Attributes.Token !== token ||
            response.Attributes.CustomUserData !== dataJson
          ) {
            updateEndpoint(endpointArn, token, dataJson);
          }
        } catch (e) {
          // endpoint was deleted
          createEndpoint(token, dataJson);
        }
      } else {
        // endpoint doesn't exist
        createEndpoint(token, dataJson);
      }
    } catch (e) {
      // Error
    }
  }
};

PushNotification.configure({
  async onRegister(token) {
    const storedToken = await getData('notificationToken');
    if (storedToken !== token.token) {
      storeData(token.token, 'notificationToken');
    }
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {
    // TO DO open kid view
    console.log('NOTIFICATION:', notification);
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: 'AIzaSyA7BXoD5KNiGENCIgYLcGetuILuW50IhK0',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
  requestPermissions: true,
});
