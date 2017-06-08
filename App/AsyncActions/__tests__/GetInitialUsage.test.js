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
    TimeUsed: 44,
  },
];

const response = {
  statusCode: 200,
  json: () => Promise.resolve(MOCK_DATA),
};

describe('getInitialUsage', () => {
  test('TODO', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      UUID: 'uuid',
    });

    // eslint-disable-next-line no-native-reassign
    fetch = () => Promise.resolve(response);

    return store.dispatch(getInitialUsage()).then(() => {
      const action = store.getActions()[0];
      expect(action.type).toEqual('FETCHED_APPS');
      expect(action.apps).toEqual(MOCK_DATA);
    });
  });
});
