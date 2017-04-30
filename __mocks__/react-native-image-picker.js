const mockResponse = {
  data: 'hey',
  uri: 'file://heythere',
};

export default {
  launchImageLibrary: jest.fn((_, callback) => {
    console.log('Mock image library called');
    callback(mockResponse);
  }),
};
