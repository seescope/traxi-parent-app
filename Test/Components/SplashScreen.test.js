jest.mock('../../App/AsyncActions/AuthenticateWithFacebook', () =>
  () => ({
    type: 'TEST_FACEBOOK_AUTH',
  }));

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Actions } from 'react-native-router-flux';

import SplashScreen, {
  mapDispatchToProps,
} from '../../App/Components/SplashScreen';

it('renders the <SplashScreen> component', () => {
  const mockStore = configureStore();
  const testStore = mockStore({});
  const tree = renderer
    .create(<Provider store={testStore}><SplashScreen /></Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('Wires up mapDispatchToProps correctly', async () => {
  const mockDispatch = jest.fn(() => Promise.resolve({}));
  const { facebookAuth } = mapDispatchToProps(mockDispatch);
  await facebookAuth();

  expect(mockDispatch).toHaveBeenCalledWith({ type: 'TEST_FACEBOOK_AUTH' });
  expect(Actions.setName).toHaveBeenCalledWith({ type: 'replace' });
});
