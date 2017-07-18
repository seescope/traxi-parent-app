jest.mock('../../App/AsyncActions/PersistParent', () => jest.fn());
jest.mock('../../App/AsyncActions/FetchReports', () => jest.fn());
jest.mock('../../App/AsyncActions/CreateParentAuthentication', () => jest.fn());

import OneSignal from 'react-native-onesignal';
import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockPersistParent from '../../App/AsyncActions/PersistParent';
import mockFetchReports from '../../App/AsyncActions/FetchReports';
import mockCreateParentAuthentication
  from '../../App/AsyncActions/CreateParentAuthentication';

import SignUpComponent, {
  mapDispatchToProps,
} from '../../App/Containers/SignUp';

Alert.alert = jest.fn();

const mockStore = configureStore([thunk]);
const testStore = mockStore({
  kidsState: {
    'abc-123': {
      name: 'John Bobson',
    },
  },
  setupState: {
    kidUUID: 'abc-123',
  },
  parentState: {},
});

const SignUp = () => (
  <Provider store={testStore}>
    <SignUpComponent />
  </Provider>
);

describe('SignUp', () => {
  it('Renders correctly', () => {
    const tree = renderer.create(<SignUp />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('onPress handles loading calls createParentAuthentication and persistParent, then goes to dashboard', () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    const { onPress } = mapDispatchToProps(mockDispatch);
    return onPress().then(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STARTED_LOADING' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOPPED_LOADING' });
      expect(mockCreateParentAuthentication).toHaveBeenCalled();
      expect(mockPersistParent).toHaveBeenCalled();
      expect(mockFetchReports).toHaveBeenCalled();
      expect(Actions.dashboard).toHaveBeenCalled();
      expect(OneSignal.registerForPushNotifications).toHaveBeenCalled();
    });
  });

  it('calls Alert when there is an error', () => {
    const testErrorMessage = 'Intentional test error - ignore!';
    const mockDispatch = jest.fn(() =>
      Promise.reject(new Error(testErrorMessage)));
    const { onPress } = mapDispatchToProps(mockDispatch);
    return onPress().then(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STARTED_LOADING' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOPPED_LOADING' });
      expect(Alert.alert).toHaveBeenCalledWith(testErrorMessage);
    });
  });
});
