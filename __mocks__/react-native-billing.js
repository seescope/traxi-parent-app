export default {
  open: jest.fn(() => Promise.resolve()),
  subscribe: jest.fn(() => Promise.resolve({ orderId: 'test-order-id' })),
  close: jest.fn(() => Promise.resolve()),
};
