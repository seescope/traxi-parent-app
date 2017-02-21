jest.mock(
  '../../App/Actions/LoginWithMethod',
  () => jest.fn(() => Promise.resolve()),
);
jest.mock(
  '../../App/Actions/SaveProfile',
  () => jest.fn(() => Promise.resolve()),
);

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoginWithMethod from '../../App/Actions/LoginWithMethod';
import SaveProfile from '../../App/Actions/SaveProfile';
import SplashScreen, {
  mapDispatchToProps,
} from '../../App/Containers/SplashScreen';

const mockStore = configureStore();
const testStore = mockStore(() => {});

it('renders the <SplashScreen> component', () => {
  const tree = renderer
    .create(
      <Provider store={testStore}>
        <SplashScreen />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('handles logins', () => {
  const mockDispatch = jest.fn(() => Promise.resolve());
  return mapDispatchToProps(mockDispatch).getStarted().then(() => {
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(Actions.intro).toHaveBeenCalled();
    expect(LoginWithMethod).toHaveBeenCalled();
    expect(SaveProfile).toHaveBeenCalled();
  });
});
