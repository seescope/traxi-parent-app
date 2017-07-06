/* eslint no-confusing-arrow:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Intercom from 'react-native-intercom';
import Analytics from 'react-native-analytics';
import OneSignal from 'react-native-onesignal';
import userLoggedIn from '../UserLoggedIn';
import { Crashlytics } from 'react-native-fabric';

describe('User Logged In', () => {
  beforeEach(() => {
    Analytics.identify.mockClear();
    Intercom.registerIdentifiedUser.mockClear();
    OneSignal.sendTags.mockClear();
  });

  test('Calls Analytics and Intercom correctly when __DEV__ is not set and user has an email', () => {
    __DEV__ = false;
    const mockStore = configureMockStore([thunk]);
    const mockParent = {
      UUID: 'abc-123',
      email: 'parent@email.com',
      name: 'Test Parent',
      kids: ['def-345'],
    };
    const mockKids = {
      'def-345': {
        name: 'Test Kid',
      },
    };
    const store = mockStore({
      parentState: mockParent,
      kidsState: mockKids,
    });

    return store.dispatch(userLoggedIn()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('USER_LOGGED_IN');
      expect(action.parent).toEqual(mockParent);

      expect(Intercom.registerIdentifiedUser).toHaveBeenCalledWith({
        userId: mockParent.UUID,
      });
      expect(Analytics.identify).toHaveBeenCalledWith(mockParent.UUID, {
        email: mockParent.email,
        name: mockParent.name,
        kidName: 'Test Kid',
      });
      expect(OneSignal.sendTags).toHaveBeenCalledWith({
        segmentio_id: mockParent.UUID,
        UUID: mockParent.UUID,
        email: mockParent.email,
        name: mockParent.name,
        kidName: 'Test Kid',
      });
      expect(Crashlytics.setUserIdentifier).toHaveBeenCalledWith(
        mockParent.UUID
      );
    });
  });

  test('Does not call Analytics, OneSignal and Intercom when __DEV__ is set to true', () => {
    __DEV__ = true;

    const mockStore = configureMockStore([thunk]);
    const mockParent = {
      UUID: 'abc-123',
      email: 'parent@email.com',
      name: 'Test Parent',
    };
    const store = mockStore({
      parentState: mockParent,
    });

    return store.dispatch(userLoggedIn()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('USER_LOGGED_IN');
      expect(action.parent).toEqual(mockParent);

      expect(Intercom.registerIdentifiedUser).not.toHaveBeenCalled();
      expect(Analytics.identify).not.toHaveBeenCalled();
      expect(OneSignal.sendTags).not.toHaveBeenCalled();
    });
  });
});
