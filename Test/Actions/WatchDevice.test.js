jest.mock('../../App/Actions/SaveProfile', () =>
  jest.fn(() => Promise.resolve()));
global.Promise = require.requireActual('promise');

import { mockOn } from 'firebase-old';
import { TEST_KID } from '../Mocks';
import Analytics from 'react-native-analytics';
import watchDevice from '../../App/Actions/WatchDevice';
import saveProfile from '../../App/Actions/SaveProfile';

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
  const mockGetState = () => ({
    selectedKid: TEST_KID,
    profile: { kids: ['First Kid'] },
  });
  const mockDispatch = jest.fn();
  mockOn.setData({ ...TEST_KID, status: 'INSTALLED' });

  return watchDevice()(mockDispatch, mockGetState).then(() => {
    expect(mockOn.mock.calls).toMatchSnapshot();
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(Analytics.track.mock.calls).toMatchSnapshot();
  });
});

it('handles duplicate kids', () => {
  const TEST_KIDS = [{ UUID: 'Kid 1' }, { UUID: 'Kid 2' }, { UUID: 'Kid 2' }];

  const mockGetState = () => ({
    selectedKid: TEST_KID,
    profile: { kids: TEST_KIDS },
  });

  const mockDispatch = jest.fn();
  mockOn.setData({ ...TEST_KID, status: 'INSTALLED' });

  return watchDevice()(mockDispatch, mockGetState).then(() => {
    expect(mockOn.mock.calls).toMatchSnapshot();
    expect(mockDispatch.mock.calls).toMatchSnapshot();
    expect(saveProfile.mock.calls).toMatchSnapshot();
  });
});
