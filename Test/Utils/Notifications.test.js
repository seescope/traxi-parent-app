import { AsyncStorage } from 'react-native';
import { AWSSNS } from 'aws-sdk-react-native-sns';

import {
  configureNotificationEndpoint,
  createDataJsonFromProfile,
  endpointAttributesAreDifferent,
} from '../../App/Utils/Notifications';

const profile = {
  UUID: 'abcdefABCDEF0123456789abcdef',
  kids: [
    {
      UUID: 'aaaabbbb-1111-2222-cccc-1234abcd1234',
      name: 'Chris',
    },
  ],
};

const enabled = 'true';
const token = 'token';
const dataJson = '{"kids":[{"name":"Chris","uuid":"aaaabbbb-1111-2222-cccc-1234abcd1234"}],"timezone":"US"}';

describe(
  'Check if configureNotificationEndpoint handles all possible scenarios',
  () => {
    it('fails if no token is set', () => configureNotificationEndpoint(
      profile
    ).then(data => {
      expect(data).toBe('Error - No token found');
    }));

    it(
      'creates a new endpoint if there is no endpointArn stored in AsyncStorage',
      () => {
        AsyncStorage.getItem = itemName => {
          if (itemName === 'notificationToken') return 'token';
          return false;
        };

        return configureNotificationEndpoint(profile).then(data => {
          expect(data).toBe('Success - Endpoint created');
        });
      }
    );

    it(
      'creates a new endpoint if there is an endpointArn in AsyncStorage but it was deleted in SNS',
      () => {
        AsyncStorage.getItem = itemName => {
          if (itemName === 'notificationToken') return 'token';
          else if (itemName === 'endpointArn') return 'endpointArn';
          return false;
        };

        return configureNotificationEndpoint(profile).then(data => {
          expect(data).toBe('Success - Endpoint created after deletion');
        });
      }
    );

    it('updates the endpoint if needed', () => {
      AsyncStorage.getItem = itemName => {
        if (itemName === 'notificationToken') return 'token';
        else if (itemName === 'endpointArn') return 'endpointArn';
        return false;
      };

      AWSSNS.GetEndpointAttributes = () => {
        const response = {
          Attributes: {
            Enabled: enabled,
            Token: 'wrongToken',
            CustomUserData: dataJson,
          },
        };
        return response;
      };

      return configureNotificationEndpoint(profile).then(data => {
        expect(data).toBe('Success - Endpoint updated');
      });
    });

    it('finishes normally if everything is up to date and working', () => {
      AsyncStorage.getItem = itemName => {
        if (itemName === 'notificationToken') return 'token';
        else if (itemName === 'endpointArn') return 'endpointArn';
        return false;
      };

      AWSSNS.GetEndpointAttributes = () => {
        const response = {
          Attributes: {
            Enabled: enabled,
            Token: token,
            CustomUserData: dataJson,
          },
        };
        return response;
      };

      return configureNotificationEndpoint(profile).then(data => {
        expect(data).toBe('Success - Endpoint was up to date');
      });
    });
  }
);

test('if it creates the correct JSON from the profile', () => {
  const expected = dataJson;
  const received = createDataJsonFromProfile(profile);

  expect(received).toEqual(expected);
});

test('if it compares attributes correctly', () => {
  const goodResponse = {
    Attributes: {
      Enabled: enabled,
      Token: token,
      CustomUserData: dataJson,
    },
  };
  expect(
    endpointAttributesAreDifferent(goodResponse, token, dataJson)
  ).toBeFalsy();

  const notEnabled = {
    Attributes: {
      Enabled: 'false',
      Token: token,
      CustomUserData: dataJson,
    },
  };
  expect(
    endpointAttributesAreDifferent(notEnabled, token, dataJson)
  ).toBeTruthy();

  const wrongToken = {
    Attributes: {
      Enabled: enabled,
      Token: 'wrong-token',
      CustomUserData: dataJson,
    },
  };
  expect(
    endpointAttributesAreDifferent(wrongToken, token, dataJson)
  ).toBeTruthy();

  const wrongCustomUserData = {
    Attributes: {
      Enabled: enabled,
      Token: token,
      CustomUserData: 'wrong-data-json',
    },
  };
  expect(
    endpointAttributesAreDifferent(wrongCustomUserData, token, dataJson)
  ).toBeTruthy();
});
