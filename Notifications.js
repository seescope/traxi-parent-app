/* eslint-disable new-cap */

import { AsyncStorage } from 'react-native';

import PushNotification from 'react-native-push-notification';
import { AWSCognitoCredentials } from 'aws-sdk-react-native-core';
import { AWSSNS } from 'aws-sdk-react-native-sns';

const COGNITO_REGION = 'ap-southeast-2';
const IDENTITY_POOL_ID = 'ap-southeast-2:a9998d71-cdf3-474f-a337-9c12289c833c';

const SNS_REGION = 'ap-southeast-2';
const PLATFORM_ARN = 'arn:aws:sns:ap-southeast-2:387118107985:app/APNS_SANDBOX/traxi';

const getEndpointArn = async () => {
  try {
    const endpointArn = await AsyncStorage.getItem('endpointArn');

    if (endpointArn !== null) {
      return endpointArn;
    }
  } catch (error) {
    // Error
  }
  return false;
};

const storeEndpointArn = async endpointArn => {
  try {
    await AsyncStorage.setItem('endpointArn', endpointArn);
  } catch (error) {
    // Error
  }
};

const createEndpoint = async token => {
  const params = {
    PlatformApplicationArn: PLATFORM_ARN,
    Token: token,
  };

  try {
    const response = await AWSSNS.CreatePlatformEndpoint(params);
    storeEndpointArn(response.EndpointArn);
  } catch (e) {
    // Error
  }
};

const updateEndpoint = async (endpointArn, token) => {
  const params = {
    EndpointArn: endpointArn,
    Attributes: {
      Token: token,
      Enabled: 'true',
    },
  };

  try {
    await AWSSNS.SetEndpointAttributes(params);
  } catch (e) {
    // Error
  }
};

export const configureEndpoint = async token => {
  try {
    await AWSCognitoCredentials.initWithOptions({
      region: COGNITO_REGION,
      identity_pool_id: IDENTITY_POOL_ID,
    });
    await AWSSNS.initWithOptions({ region: SNS_REGION });
    const endpointArn = await getEndpointArn();

    if (endpointArn) {
      try {
        const response = await AWSSNS.GetEndpointAttributes({
          EndpointArn: endpointArn,
        });
        if (
          response.Attributes.Enabled !== 'true' ||
          response.Attributes.Token !== token
        ) {
          updateEndpoint(endpointArn, token);
        }
      } catch (e) {
        // endpoint was deleted
        createEndpoint(token);
      }
    } else {
      // endpoint doesn't exist
      createEndpoint(token);
    }
  } catch (e) {
    // Error
  }
};

PushNotification.configure({
  async onRegister(token) {
    configureEndpoint(token.token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification(notification) {
    // console.log('NOTIFICATION:', notification);
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: 'YOUR GCM SENDER ID',

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
