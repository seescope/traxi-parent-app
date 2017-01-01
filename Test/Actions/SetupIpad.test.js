import setupIpad from '../../App/Actions/SetupIpad';
import mockFirebase, { mockSet } from 'firebase';

global.Promise = require.requireActual('promise');

it('sets up an iPad', () => {
  const TEST_KID = {
    name: 'Test Name',
    phoneNumber: '+61401633346',
    deviceType: 'iPad',
  };

  Math.random = () => 0.1234;
  const mockDispatch = jest.fn();
  const mockGetState = () => ({
    selectedKid: TEST_KID
  });

  return setupIpad()(mockDispatch, mockGetState).then(() => {
    // Dispatch SET_UUID
    expect(mockDispatch.mock.calls[0]).toMatchSnapshot();

    // Create Firebase refs with correct path
    expect(mockFirebase.mock.calls[0]).toMatchSnapshot();
    expect(mockFirebase.mock.calls[1]).toMatchSnapshot();

    // Post setup ID to Firebase
    expect(mockSet.mock.calls[0]).toMatchSnapshot();

    // Post kid to Firebase
    expect(mockSet.mock.calls[1]).toMatchSnapshot();
  });
});
