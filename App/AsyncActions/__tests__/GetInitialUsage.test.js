import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getInitialUsage from '../GetInitialUsage';

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
  test('getInitialUsage() works proprely the first time', () => {
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

    // eslint-disable-next-line no-native-reassign
    fetch = () => Promise.resolve(response);

    const expected = [
      { type: 'FETCHED_APPS_STATUS', isFetchingApps: true },
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
      { type: 'FETCHED_APPS_STATUS', isFetchingApps: false },
    ];
    return store.dispatch(getInitialUsage()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });

  test('getInitialUsage() works proprely with a previous state', () => {
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

    // eslint-disable-next-line no-native-reassign
    fetch = () => Promise.resolve(response);

    const expected = [
      { type: 'FETCHED_APPS_STATUS', isFetchingApps: true },
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
      { type: 'FETCHED_APPS_STATUS', isFetchingApps: false },
    ];
    return store.dispatch(getInitialUsage()).then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
