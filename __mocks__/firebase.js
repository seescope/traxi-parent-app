export const profile = {
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

export const initializeApp = () => {};
export const database = () => ({
  ref: () => ({
    once: () =>
      Promise.resolve({
        val: () => profile,
      }),
  }),
  goOffline: () => {},
});

const firebase = {};

export default firebase;
