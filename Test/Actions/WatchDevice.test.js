global.Promise = require.requireActual('promise');

import { TEST_KID } from '../Mocks';
import watchDevice from '../../App/Actions/WatchDevice';
import { mockOn } from 'firebase';

jest.mock('../../App/Actions/SaveProfile', () => () => Promise.resolve());

it('registers a listener with Firebase that dispatches a DEVICE_UPDATED action', () => {
  const mockGetState = () => ({ selectedKid: TEST_KID });
  const mockDispatch = jest.fn();

  // Exercise
  watchDevice()(mockDispatch, mockGetState);

  // Assert
  expect(mockOn.mock.calls).toMatchSnapshot();
  expect(mockDispatch.mock.calls).toMatchSnapshot();
});

it('handles when the device has been installed', () => {
  const mockGetState = () => ({ selectedKid: TEST_KID, kids: [], profile: { kids: ['First Kid'] } });
  const mockDispatch = jest.fn();
  mockOn.setData({ ...TEST_KID, status: 'INSTALLED' });

  return watchDevice()(mockDispatch, mockGetState).then(() => {
    expect(mockOn.mock.calls).toMatchSnapshot();
    expect(mockDispatch.mock.calls).toMatchSnapshot();
  });
});
