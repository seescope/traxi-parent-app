const mockResponse = {
  data: 'hey',
  uri: 'file://heythere',
};

export default {
  launchImageLibrary: jest.fn((_, callback) => callback(mockResponse)),
};
