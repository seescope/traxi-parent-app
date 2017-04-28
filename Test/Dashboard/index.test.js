import React from 'react';
import Dashboard from '../../App/Dashboard';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

it('renders correctly', () => {
  const mockStore = configureStore();
  const testStore = mockStore({ 
    loading: true,
    kids: [
      {
        UUID: 'abc-123',
      },
    ],
    reports: {
      'abc-123': {
        topApps: {},
        topCategories: {},
        peakTimes: {},
        recentApps: [],
      },
    },
  });

  const tree = renderer.create(<Provider store={testStore}><Dashboard /></Provider>);
  expect(tree.toJSON()).toMatchSnapshot();
});
