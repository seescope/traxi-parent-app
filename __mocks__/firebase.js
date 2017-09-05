const profile = {
  UUID: 'YwS0vJ8OE8N6yenxHaV6PdMVLbG3',
  email: 'enakudesu@gmail.com',
  kids: {
    '0': {
      UUID: '2f566920-f598-46d2-8bf2-7bcae115bf0a',
      avatarURL: 'http://i.imgur.com/52mRwuE.jpg',
      deviceType: 'Android',
      name: 'Sam',
      setupID: 5406,
      status: 'INSTALLED',
    },
    '1': {
      UUID: '886b79ea-3572-4b4a-9c25-59b14639ac3d',
      avatarURL: 'https://tiestoclublife.files.wordpress.com/2008/08/dj-tiesto-club-life.jpeg',
      name: 'DJ',
    },
  },
  name: 'Kane Rogers',
  picture: 'https://lh3.googleusercontent.com/-7yt2pBdbMwk/AAAAAAAAAAI/AAAAAAAAD0g/4IHp0iIWDBE/s96-c/photo.jpg',
  token: 'cjj6guKMTME:APA91bFkM3nynjnD5vqxxeYG42t4P6PThP4N1F7VmhNbRW_W_ReCqGtoiDtwG99K4GmD6_Sh_VuCFCR46GwXH314YfdciS0OTGdwe0OGxYvT2RiYhozwcmlLI2TyHn78z26Kw7SYquCD',
};

export const mockSet = jest.fn(() => Promise.resolve());
export const mockData = {
  data: {},
};
const mockSnapshot = {
  val: () => mockData.data,
};
export const mockCreateUser = jest.fn(() => Promise.resolve());
export const mockUpdateProfile = jest.fn(() => Promise.resolve());
export const mockOn = jest.fn((val, cb) => Promise.resolve(cb(mockSnapshot)));
export const mockPush = jest.fn(() => ({
  set: mockSet,
}));

const MOCK_USER = {
  displayName: 'MOCK_NAME',
  email: 'MOCK_EMAIL',
};
MOCK_USER.toJSON = () => 'jason';

export const mockSignInWithCredential = jest.fn(() =>
  Promise.resolve(MOCK_USER));

let mockVal = profile;

export const initializeApp = () => {};
export const mockRef = jest.fn(() => ({
  once: () =>
    Promise.resolve({
      val: () => mockVal,
    }),
  update: () => jest.fn(),
  set: mockSet,
  on: mockOn,
  off: jest.fn(),
  push: mockPush,
}));

export const database = () => ({
  ref: mockRef,
  goOffline: () => {},
});

export const setMockVal = val => {
  mockVal = val;
};

export const auth = () => ({
  currentUser: {
    updateProfile: mockUpdateProfile,
  },
  createUserWithEmailAndPassword: mockCreateUser,
  signInWithCredential: mockSignInWithCredential,
});

auth.FacebookAuthProvider = {
  credential: jest.fn(() => 'MOCK_CREDENTIAL'),
};
