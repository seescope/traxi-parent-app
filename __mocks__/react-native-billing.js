export default {
  open: () => Promise.resolve(),
  subscribe: jest.fn(() => Promise.resolve),
  close: () => Promise.resolve(),
};
