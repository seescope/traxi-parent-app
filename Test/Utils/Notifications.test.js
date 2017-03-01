import { AsyncStorage } from 'react-native';
import { AWSSNS } from 'aws-sdk-react-native-sns';

jest.mock('../../App/Utils');
import { logError } from '../../App/Utils';

import Notifications from '../../App/Utils/Notifications';
Notifications.createEndpoint = jest.fn();
Notifications.updateEndpoint = jest.fn();

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
const endpointArn = 'endpointArn';

describe(
  'Check if configureNotificationEndpoint handles all possible scenarios',
  () => {
    it(
      'fails if no token is set',
      () => Notifications.configureNotificationEndpoint(profile).then(() => {
        expect(logError).toHaveBeenCalledWith(
          '[Notifications] Error - No token found'
        );
      })
    );

    it(
      'creates a new endpoint if there is no endpointArn stored in AsyncStorage',
      () => {
        expect.assertions(1);

        AsyncStorage.getItem = itemName => {
          if (itemName === 'notificationToken') return token;
          return false;
        };

        Notifications.createEndpoint.mockClear();

        return Notifications.configureNotificationEndpoint(profile).then(() => {
          expect(Notifications.createEndpoint).toHaveBeenCalledWith(
            token,
            dataJson
          );
        });
      }
    );

    it(
      'creates a new endpoint if there is an endpointArn in AsyncStorage but it was deleted in SNS',
      () => {
        AsyncStorage.getItem = itemName => {
          if (itemName === 'notificationToken') return token;
          else if (itemName === 'endpointArn') return endpointArn;
          return false;
        };

        Notifications.createEndpoint.mockClear();

        return Notifications.configureNotificationEndpoint(profile).then(() => {
          expect(Notifications.createEndpoint).toHaveBeenCalledWith(
            token,
            dataJson
          );
        });
      }
    );

    it('updates the endpoint if needed', () => {
      AsyncStorage.getItem = itemName => {
        if (itemName === 'notificationToken') return token;
        else if (itemName === 'endpointArn') return endpointArn;
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

      Notifications.updateEndpoint.mockClear();

      return Notifications.configureNotificationEndpoint(profile).then(() => {
        expect(Notifications.updateEndpoint).toHaveBeenCalledWith(
          endpointArn,
          token,
          dataJson
        );
      });
    });

    it('finishes normally if everything is up to date and working', () => {
      AsyncStorage.getItem = itemName => {
        if (itemName === 'notificationToken') return token;
        else if (itemName === 'endpointArn') return endpointArn;
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

      logError.mockClear();
      Notifications.createEndpoint.mockClear();
      Notifications.updateEndpoint.mockClear();

      return Notifications.configureNotificationEndpoint(profile).then(() => {
        expect(Notifications.createEndpoint).not.toHaveBeenCalled();
        expect(Notifications.updateEndpoint).not.toHaveBeenCalled();
        expect(logError).not.toHaveBeenCalled();
      });
    });
  }
);

test('if it creates the correct JSON from the profile', () => {
  const expected = dataJson;
  const received = Notifications.createDataJsonFromProfile(profile);

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
    Notifications.endpointAttributesAreDifferent(goodResponse, token, dataJson)
  ).toBeFalsy();

  const notEnabled = {
    Attributes: {
      Enabled: 'false',
      Token: token,
      CustomUserData: dataJson,
    },
  };
  expect(
    Notifications.endpointAttributesAreDifferent(notEnabled, token, dataJson)
  ).toBeTruthy();

  const wrongToken = {
    Attributes: {
      Enabled: enabled,
      Token: 'wrong-token',
      CustomUserData: dataJson,
    },
  };
  expect(
    Notifications.endpointAttributesAreDifferent(wrongToken, token, dataJson)
  ).toBeTruthy();

  const wrongCustomUserData = {
    Attributes: {
      Enabled: enabled,
      Token: token,
      CustomUserData: 'wrong-data-json',
    },
  };
  expect(
    Notifications.endpointAttributesAreDifferent(
      wrongCustomUserData,
      token,
      dataJson
    )
  ).toBeTruthy();
});
