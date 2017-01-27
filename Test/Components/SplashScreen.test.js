import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import SplashScreen from '../../App/Components/SplashScreen';

const mockStore = configureStore();
const testStore = mockStore(() => {});

it('renders the <SplashScreen> component', () => {
  const tree = renderer.create(
    <Provider store={testStore}>
      <SplashScreen />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
