export default {
  open: () => Promise.resolve(),
  subscribe: jest.fn(() => Promise.resolve({ success: true })),
  close: () => Promise.resolve(),
};
