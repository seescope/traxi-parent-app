export const TEST_CONTACTS_LIST = [
  {
    emailAddresses: [
      { label: 'home', email: 'yin.quak.soon@gmail.com' }
    ],
    phoneNumbers: [ { label: 'mobile', number: '+60 14 2837 979' } ],
    thumbnailPath: 'content://com.android.contacts/contacts/1005/photo',
    familyName: 'Yin',
    middleName: 'Soon',
    givenName: 'Quak',
    recordID: 1006 
  },
  {
    emailAddresses: [
      { label: 'other', email: '113@172.23.4.2' },
      { label: 'work', email: 'marc.robinson@bluereef.com.au' },
      { label: 'home', email: 'mcrobo@gmail.com' }
    ],
    phoneNumbers: [ { label: 'mobile', number: '0400 669 057' } ],
    thumbnailPath: 'content://com.android.contacts/contacts/1005/photo',
    familyName: 'Robinson',
    middleName: 'C.',
    givenName: 'Marc',
    recordID: 1005 
  },
  { 
    emailAddresses: [ 
      { label: 'other', email: '123@172.23.4.2' },
      { label: 'other', email: 'guy.lupo@bluereef.com.au' },
      { label: 'other', email: 'lupoguy1@gmail.com' } 
    ],
    phoneNumbers: [
      { label: 'home', number: '(03) 9570 3995' },
      { label: 'other', number: '+1 415 216 7995' },
      { label: 'mobile', number: '0432031301' } 
    ],
    thumbnailPath: 'content://com.android.contacts/contacts/688/photo',
    familyName: 'Lupo',
    middleName: null,
    givenName: 'Guy',
    recordID: 688 
  }];

export const TEST_CONTACTS = [
  {
    name: 'Guy Lupo',
    phoneNumber: '123123',
  },
  {
    name: 'Marc Robinson',
    phoneNumber: '345345',
  }
];

export const TEST_UUID = 'a5f1bc36-89f5-4212-98c6-e92797a2a220';
export const TEST_KID_FIRST_NAME = 'Edith';
export const TEST_KID_NAME = `${TEST_KID_FIRST_NAME} Crawley`;
export const TEST_KID = { name: TEST_KID_NAME, UUID: TEST_UUID, avatarURL: 'https://s-media-cache-ak0.pinimg.com/736x/24/48/12/2448127e36c0e72de41aa768322639a3.jpg' };
export const TEST_REPORT_DATA = {
  '2016-07-08': [
      { name: 'Instagram', timeStamp: '2016-07-08T17:05:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
      { name: 'Google Maps', timeStamp: '2016-07-08T16:58:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300', category: 'Travel & Local' },
      { name: 'Google Chrome', timeStamp: '2016-07-08T15:45:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/nYhPnY2I-e9rpqnid9u9aAODz4C04OycEGxqHG5vxFnA35OGmLMrrUmhM9eaHKJ7liB-=w300', category: 'Communication' },
      { name: 'Instagram', timeStamp: '2016-07-08T14:01:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
      { name: 'Google Search', timeStamp: '2016-07-08T11:43:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/DKoidc0T3T1KvYC2stChcX9zwmjKj1pgmg3hXzGBDQXM8RG_7JjgiuS0CLOh8DUa7as=w300', category: 'Tools' },
      { name: 'Spotify', timeStamp: '2016-07-08T11:43:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w300', category: 'Music & Audio' },
  ],
  '2016-07-07': [
      { name: 'Instagram', timeStamp: '2016-07-07T22:47:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
      { name: 'Instagram', timeStamp: '2016-07-07T22:05:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
  ],
};

export const TEST_REPORTS = {
  '2016-07-08': {
    circles: [
      { name: 'Late Night', status: 'good', minutesUsed: 0 },
      { name: 'Device Time', status: 'good', minutesUsed: 24 },
      { name: 'Social Time', status: 'good', minutesUsed: 4 },
    ],
    trail: [
      {
        name: 'Evening',
        trailItems: [
          { name: 'Instagram', timeStamp: '2016-07-08T17:05:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
        ]
      },
      { 
        name: 'Afternoon',
        trailItems: [
          { name: 'Google Maps', timeStamp: '2016-07-08T16:58:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/MOf9Kxxkj7GvyZlTZOnUzuYv0JAweEhlxJX6gslQvbvlhLK5_bSTK6duxY2xfbBsj43H=w300', category: 'Travel & Local' },
          { name: 'Google Chrome', timeStamp: '2016-07-08T15:45:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/nYhPnY2I-e9rpqnid9u9aAODz4C04OycEGxqHG5vxFnA35OGmLMrrUmhM9eaHKJ7liB-=w300', category: 'Communication' },
          { name: 'Instagram', timeStamp: '2016-07-08T14:01:01+10:00', minutesUsed: 2, logo: 'https://lh3.googleusercontent.com/aYbdIM1abwyVSUZLDKoE0CDZGRhlkpsaPOg9tNnBktUQYsXflwknnOn2Ge1Yr7rImGk=w300', category: 'Social' },
        ],
      },
      {
        name: 'Morning',
        trailItems: [
          { name: 'Google Search', timeStamp: '2016-07-08T11:43:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/DKoidc0T3T1KvYC2stChcX9zwmjKj1pgmg3hXzGBDQXM8RG_7JjgiuS0CLOh8DUa7as=w300', category: 'Tools' },
          { name: 'Spotify', timeStamp: '2016-07-08T11:43:01+10:00', minutesUsed: 6, logo: 'https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w300', category: 'Music & Audio' },
        ],
      },
    ]
  }
}

export const TEST_STATE = {
  profile: {
    userID: 'abc123',
  },
  parentName: 'Kane',
  contacts: [],
  step: 0,
  kidSuggestions: [],
  kids: [{
    phoneNumber: '+61401633346',
    name: 'Oliver Senese',
    avatarURL: 'http://i.imgur.com/FSvg4q2.png?1',
    UUID: 'a5f1bc36-89f5-4212-98c6-e92797a2a220',
  }],
  selectedKid: {
    phoneNumber: '+61401633346',
    name: 'Oliver Senese',
    avatarURL: 'http://i.imgur.com/FSvg4q2.png?1',
    UUID: 'a5f1bc36-89f5-4212-98c6-e92797a2a220',
  },
  reports: {
    [TEST_UUID]: TEST_REPORTS,
  }
};

export const TEST_DATE = '2016-07-08';
