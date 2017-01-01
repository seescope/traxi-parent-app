import {
  TEST_REPORT_DATA,
  TEST_DATE,
  TEST_KID,
} from '../Test/Mocks';


const data = {
  val: () => TEST_REPORT_DATA[TEST_DATE],
};

const onData = {
  val: () => TEST_KID,
};

export const mockSet = jest.fn((_, cb) => cb());
export const mockOn = jest.fn((_, cb) => cb(onData));
mockOn.setData = mockData => {
  onData.val = () => mockData;
};

const firebaseClient = {
  on: mockOn,
  once: jest.fn((_, cb) => cb(data)),
  set: mockSet,
};

const firebase = jest.fn(() => firebaseClient);
export default firebase;
