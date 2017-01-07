import {
  TEST_KID,
} from '../Test/Mocks';


const onData = {
  val: () => TEST_KID,
};

export const mockSet = jest.fn((_, cb) => cb());
export const mockOn = jest.fn((_, cb) => cb(onData));
mockOn.setData = mockData => {
  onData.val = () => mockData;
};

export const mockOnce = jest.fn((_, cb) => cb(onData));

mockOnce.setData = mockData => {
  onData.val = () => mockData;
};

const firebaseClient = {
  on: mockOn,
  once: mockOnce,
  set: mockSet,
};

const firebase = jest.fn(() => firebaseClient);
export default firebase;
