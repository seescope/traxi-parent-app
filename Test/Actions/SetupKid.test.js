import setupKid from '../../App/Actions/SetupKid';
import mockFirebase, { mockSet } from 'firebase';

global.Promise = require.requireActual('promise');

it('sets up a Kid', () => {
  const TEST_KID = {
    name: 'Test Name',
    phoneNumber: '+61401633346',
  };

  Math.random = () => 0.1234;

  const mockDispatch = jest.fn();
  const mockGetState = () => ({
    selectedKid: TEST_KID,
  });

  return setupKid()(mockDispatch, mockGetState).then(() => {
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
