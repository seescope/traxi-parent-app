const MOCK_LOGIN_RESULT = {
  grantedPermissions: 'Something',
};

const MOCK_ACCESS_TOKEN = {
  data: {
    accessToken: 'MOCK_ACCESS_TOKEN',
  },
};

export const LoginManager = {
  logInWithReadPermissions: jest.fn(() => Promise.resolve(MOCK_LOGIN_RESULT)),
};

export const AccessToken = {
  getCurrentAccessToken: jest.fn(() => Promise.resolve(MOCK_ACCESS_TOKEN)),
};
