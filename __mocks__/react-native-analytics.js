export default {
  identify: jest.fn(),
  track: jest.fn(() => Promise.resolve()),
};
