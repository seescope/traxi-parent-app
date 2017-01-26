jest.mock('../../App/Components/ProgressTrack', () => () => null);

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Walkthrough from '../../App/Containers/Walkthrough';

const TEST_KID = {
  name: 'Brett Bastian',
  number: '+61401633346',
  avatarURL: 'https://www.wired.com/wp-content/uploads/archive/images/slideshow/magazine/1505/FF_raves_heroes1_f.jpg',
};

const TEST_STATE = {
  parentName: 'Jeff Bezos',
  selectedKid: TEST_KID,
  step: 1,
  profile: { user_id: 1 },
  nextStep: () => {},
};

const mockStore = configureStore([thunk]);
const testStore = mockStore(() => TEST_STATE);

const WalkthroughComponent = () => (
  <Provider store={testStore}>
    <Walkthrough />
  </Provider>
);

it('renders the Walkthrough component at each stage for iPhone', () => {
  TEST_KID.deviceType = 'iPhone';
  TEST_STATE.step = 0;

  while (TEST_STATE.step <= 7) {
    const tree = renderer.create(<WalkthroughComponent />).toJSON();
    expect(tree).toMatchSnapshot();

    TEST_STATE.step++;
  }
});

it('renders the Walkthrough component at each stage for iPad', () => {
  TEST_KID.deviceType = 'iPad';
  TEST_KID.setupID = 1234;
  TEST_STATE.step = 0;

  while (TEST_STATE.step <= 7) {
    const tree = renderer.create(<WalkthroughComponent />).toJSON();
    expect(tree).toMatchSnapshot();

    TEST_STATE.step++;
  }
});

it('renders the Walkthrough component at each stage for Android', () => {
  TEST_KID.deviceType = 'Android';
  TEST_STATE.step = 0;

  while (TEST_STATE.step <= 8) {
    const tree = renderer.create(<WalkthroughComponent />).toJSON();
    expect(tree).toMatchSnapshot();

    TEST_STATE.step++;
  }
});

it('renders the loading screen when waiting to identify a device', () => {
  TEST_KID.deviceType = 'unknown';
  TEST_STATE.step = 2;

  const tree = renderer.create(<WalkthroughComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
