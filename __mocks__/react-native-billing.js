export default {
  open: jest.fn(() => Promise.resolve()),
  subscribe: jest.fn(() => Promise.resolve({ success: true })),
  close: jest.fn(() => Promise.resolve()),
};
