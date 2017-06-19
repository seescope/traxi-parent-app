import React from 'react';
import InitialUsage from '../';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

it('renders correctly when there are no apps', () => {
  const mockStore = configureStore();
  const testStore = mockStore({
    kidsState: {
      'abc-123': {
        name: 'Jim Bob',
      },
    },
    setupState: {
      kidUUID: 'abc123',
      apps: [],
    },
  });

  const tree = renderer.create(
    <Provider store={testStore}><InitialUsage /></Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly when there is one app', () => {
  const mockStore = configureStore();
  const testStore = mockStore({
    kidsState: {
      'abc-123': {
        name: 'Jim Bob',
      },
    },
    setupState: {
      kidUUID: 'abc123',
      apps: [
        {
          name: 'Trello',
          logo: 'something',
          progress: 10,
        },
      ],
    },
  });

  const tree = renderer.create(
    <Provider store={testStore}><InitialUsage /></Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly when there are two apps', () => {
  const mockStore = configureStore();
  const testStore = mockStore({
    kidsState: {
      'abc-123': {
        name: 'Jim Bob',
      },
    },
    setupState: {
      kidUUID: 'abc123',
      apps: [
        {
          name: 'Trello',
          logo: 'something',
          progress: 10,
        },
        {
          name: 'Not Trello',
          logo: 'something',
          progress: 10,
        },
      ],
    },
  });

  const tree = renderer.create(
    <Provider store={testStore}><InitialUsage /></Provider>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
