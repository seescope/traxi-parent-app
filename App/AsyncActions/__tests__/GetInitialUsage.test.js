/* eslint no-native-reassign:0 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getInitialUsage from '../GetInitialUsage';
import { Actions } from 'react-native-router-flux';

const MOCK_DATA = [
  {
    Category: 'Business',
    Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
    Name: 'Slack - Business Communication for Teams',
    TimeUsed: 30,
  },
  {
    Category: 'Tools',
    Logo: 'http://i.imgur.com/sE9S6oZ.png',
    Name: 'Safari',
    TimeUsed: 13,
  },
  {
    Category: 'Tools',
    Logo: 'http://i.imgur.com/sE9S6oZ.png',
    Name: 'Safari',
    TimeUsed: 12,
  },
  {
    Category: '',
    Logo: '',
    Name: 'TO REMOVE',
    TimeUsed: 2,
  },
];

const response = {
  json: () =>
    Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(MOCK_DATA),
    }),
};

describe('getInitialUsage', () => {
  beforeEach(() => {
    fetch = () => Promise.resolve(response);
    Actions.dashboard.mockClear();
  });

  test('fetches the initialUsage of a user for the first time', () => {
    fetch = () => Promise.resolve(response);
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: {
        kids: [
          {
            UUID: 'uuid',
          },
        ],
      },
    });

    const expected = [
      {
        type: 'FETCHED_APPS',
        apps: [
          {
            name: 'Slack - Business Communication for Teams',
            logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
            progress: 50,
          },
          {
            name: 'Safari',
            logo: 'http://i.imgur.com/sE9S6oZ.png',
            progress: 42,
          },
        ],
      },
    ];
    return store.dispatch(getInitialUsage()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  test('updates the previous state with new usage', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: {
        kids: [
          {
            UUID: 'uuid',
          },
        ],
      },
      setupState: {
        apps: [
          {
            name: 'Slack - Business Communication for Teams',
            logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
            progress: 50,
          },
          {
            name: 'Safari',
            logo: 'http://i.imgur.com/sE9S6oZ.png',
            progress: 73,
          },
          {
            name: 'Facebook',
            logo: '',
            progress: 33,
          },
        ],
      },
    });

    const expected = [
      {
        type: 'FETCHED_APPS',
        apps: [
          {
            name: 'Slack - Business Communication for Teams',
            logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
            progress: 50,
          },
          {
            name: 'Safari',
            logo: 'http://i.imgur.com/sE9S6oZ.png',
            progress: 100,
          },
          {
            name: 'Facebook',
            logo: '',
            progress: 33,
          },
        ],
      },
    ];
    return store.dispatch(getInitialUsage()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  test('navigates to the dashboard when there is enough usage', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      parentState: {
        kids: [
          {
            UUID: 'uuid',
          },
        ],
      },
    });

    const GOOD_DATA = [
      {
        Category: 'Business',
        Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
        Name: 'Slack - Business Communication for Teams',
        TimeUsed: 100,
      },
      {
        Category: 'Tools',
        Logo: 'http://i.imgur.com/sE9S6oZ.png',
        Name: 'Safari',
        TimeUsed: 100,
      },
    ];
    const goodResponse = {
      json: () =>
        Promise.resolve({
          statusCode: 200,
          body: JSON.stringify(GOOD_DATA),
        }),
    };

    fetch = () => Promise.resolve(goodResponse);

    return store.dispatch(getInitialUsage()).then(() => {
      expect(Actions.dashboard).toHaveBeenCalled();
    });
  });
});
