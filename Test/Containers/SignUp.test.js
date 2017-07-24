jest.mock('../../App/AsyncActions/PersistParent', () => jest.fn());
jest.mock('../../App/AsyncActions/CreateParentAuthentication', () => jest.fn());

import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockPersistParent from '../../App/AsyncActions/PersistParent';
import mockCreateParentAuthentication
  from '../../App/AsyncActions/CreateParentAuthentication';

import SignUpComponent, { mergeProps } from '../../App/Containers/SignUp';

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

describe('mergeProps', () => {
  it('onCompleteSetup handles loading calls createParentAuthentication and persistParent, then goes to dashboard', () => {
    const mockDispatch = jest.fn(() => Promise.resolve());
    const { onCompleteSetup } = mergeProps({}, { dispatch: mockDispatch });
    return onCompleteSetup().then(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STARTED_LOADING' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOPPED_LOADING' });
      expect(mockCreateParentAuthentication).toHaveBeenCalled();
      expect(mockPersistParent).toHaveBeenCalled();
      expect(Actions.setName).toHaveBeenCalled();
    });
  });

  it('calls Alert when there is an error', () => {
    const testErrorMessage = 'Intentional test error - ignore!';
    const mockDispatch = jest.fn(() =>
      Promise.reject(new Error(testErrorMessage)));
    const { onCompleteSetup } = mergeProps({}, { dispatch: mockDispatch });
    return onCompleteSetup().then(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STARTED_LOADING' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'STOPPED_LOADING' });
      expect(Alert.alert).toHaveBeenCalledWith(testErrorMessage);
    });
  });
});
