/* eslint no-native-reassign:0 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import getInitialUsage from '../GetInitialUsage';
import { Actions } from 'react-native-router-flux';

const ISO_TIMESTAMP_REGEX = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
const ACTIVATED_PARENT_ACTION = {
  type: 'ACTIVATED_PARENT',
  activatedAt: expect.stringMatching(ISO_TIMESTAMP_REGEX),
};

const MOCK_FIRST_DATA = [
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
    Category: '',
    Logo: '',
    Name: 'TO REMOVE',
    TimeUsed: 2,
  },
  {
    Name: 'Trello',
    Category: 'Productivity',
    Logo: 'trello-logo',
    DetectedAutomatically: true,
    TimeUsed: 28.897,
  },
];

const MOCK_SECOND_DATA = [
  {
    Category: 'Business',
    Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
    Name: 'Slack - Business Communication for Teams',
    TimeUsed: 62,
  },
  {
    Category: 'Tools',
    Logo: 'http://i.imgur.com/sE9S6oZ.png',
    Name: 'Safari',
    TimeUsed: 13,
  },
  {
    Category: '',
    Logo: '',
    Name: 'TO REMOVE',
    TimeUsed: 2,
  },
];

const MOCK_THIRD_DATA = [
  {
    Category: 'Business',
    Logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
    Name: 'Slack - Business Communication for Teams',
    TimeUsed: 62,
  },
  {
    Category: 'Tools',
    Logo: 'http://i.imgur.com/sE9S6oZ.png',
    Name: 'Safari',
    TimeUsed: 61,
  },
  {
    Category: '',
    Logo: '',
    Name: 'TO REMOVE',
    TimeUsed: 2,
  },
];

const mockJSONResponse = jest.fn();
mockJSONResponse
  .mockReturnValueOnce(MOCK_FIRST_DATA)
  .mockReturnValueOnce(MOCK_SECOND_DATA)
  .mockReturnValue(MOCK_THIRD_DATA);

const response = {
  ok: true,
  json: mockJSONResponse,
};

describe('getInitialUsage', () => {
  test('fetches the initialUsage of a user until 1 app has 100% progress', () => {
    // Safety net to stop infinite loops.
    let fetchCalled = 0;
    fetch = () => {
      fetchCalled += 1;
      if (fetchCalled >= 5) throw new Error('INFINITE LOOOOP');
      return Promise.resolve(response);
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: {
        apps: undefined,
        kidUUID: 'uuid',
      },
      parentState: {},
    });

    const EXPECTED_ACTIONS = [
      {
        apps: [
          {
            logo: 'http://is1.mzstatic.com/image/thumb/Purple127/v4/b8/bd/5e/b8bd5ebb-4cd9-b529-ddf3-22a1f9a497ba/source/512x512bb.jpg',
            name: 'Slack - Business Communication for Teams',
            progress: 50,
          },
          {
            logo: 'http://i.imgur.com/sE9S6oZ.png',
            name: 'Safari',
            progress: 22,
          },
          { logo: 'trello-logo', name: 'Trello', progress: 48 },
        ],
        type: 'FETCHED_APPS',
      },
      ACTIVATED_PARENT_ACTION,
    ];

    return store.dispatch(getInitialUsage()).then(() => {
      expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
      expect(Actions.setKidImage).toHaveBeenCalled();
    });
  });

  test('replaces the existing fetched apps state when the new progress is higher', () => {
    const FETCHED_APPS = [
      {
        Name: 'Slack - Business Communication for Teams',
        TimeUsed: 61,
      },
      {
        Name: 'Facebook',
        TimeUsed: 33,
      },
    ];
    const EXISTING_APPS = [
      {
        name: 'Slack - Business Communication for Teams',
        progress: 10,
      },
      {
        Name: 'Safari',
        progress: 100,
      },
    ];

    // Safety net to stop infinite loops.
    let fetchCalled = 0;
    fetch = () => {
      fetchCalled += 1;
      if (fetchCalled >= 5) throw new Error('Infinite loop!');
      return Promise.resolve({
        ok: true,
        json: () => FETCHED_APPS,
      });
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: {
        apps: EXISTING_APPS,
        kidUUID: 'uuid',
      },
      parentState: {},
    });
    return store.dispatch(getInitialUsage()).then(() => {
      expect(Actions.setKidImage).toHaveBeenCalled();
      expect(store.getActions()).toEqual([ACTIVATED_PARENT_ACTION]);
    });
  });

  test('adds progress to the existing fetched apps state when the new progress is lower', () => {
    const FETCHED_APPS = [
      {
        Name: 'Slack - Business Communication for Teams',
        TimeUsed: 30,
      },
      {
        Name: 'Safari',
        TimeUsed: 60,
      },
      {
        Name: 'Facebook',
        TimeUsed: 33,
      },
    ];
    const EXISTING_APPS = [
      {
        name: 'Slack - Business Communication for Teams',
        progress: 60,
      },
      {
        name: 'Facebook',
        progress: 55,
      },
    ];

    // Safety net to stop infinite loops.
    let fetchCalled = 0;
    fetch = () => {
      fetchCalled += 1;
      if (fetchCalled >= 5) throw new Error('Infinite loop!');
      return Promise.resolve({
        ok: true,
        json: () => FETCHED_APPS,
      });
    };

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      setupState: {
        apps: EXISTING_APPS,
        kidUUID: 'uuid',
      },
      parentState: {},
    });

    return store.dispatch(getInitialUsage()).then(() => {
      expect(Actions.setKidImage).toHaveBeenCalled();
      expect(store.getActions()).toEqual([ACTIVATED_PARENT_ACTION]);
    });
  });
});
