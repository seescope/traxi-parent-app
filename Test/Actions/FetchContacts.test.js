import fetchContacts from '../../App/Actions/FetchContacts';

describe('fetchContacts', () => {
  it('loads the contacts and dispatches a GOT_CONTACTS event', () => {
    const TEST_DISPATCH = jest.fn();

    // Exercise
    const action = fetchContacts();
    const promise = action(TEST_DISPATCH);

    // Expectations
    const EXPECTED_CONTACTS = [
      {name: 'Marc Robinson', phoneNumber: '+61400669057', avatarURL: 'content://com.android.contacts/contacts/1005/photo' },
      {name: 'Guy Lupo', phoneNumber: '+61432031301', avatarURL: 'content://com.android.contacts/contacts/688/photo'}
    ];

    return promise.then(() => {
      expect(TEST_DISPATCH.mock.calls).toMatchSnapshot();
    });
  });
});

