import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { TEST_CONTACTS_LIST } from '../Mocks';

describe('fetchContacts', () => {
  it('loads the contacts dispatches a GOT_CONTACTS event', (done) => {
    const TEST_DISPATCH = sinon.spy();
    const TEST_CONTACTS = sinon.mock();
    TEST_CONTACTS.callsArgWith(0, null, TEST_CONTACTS_LIST);

    // Mock out dependencies
    const fetchContacts = proxyquire.noCallThru()('../../App/Actions/FetchContacts', {
      'react-native-contacts': { getAll: TEST_CONTACTS },
    }).default;

    // Exercise
    const action = fetchContacts();
    const promise = action(TEST_DISPATCH);

    // Expectations
    const EXPECTED_CONTACTS = [
      {name: 'Marc Robinson', phoneNumber: '+61400669057', avatarURL: 'content://com.android.contacts/contacts/1005/photo' },
      {name: 'Guy Lupo', phoneNumber: '+61432031301', avatarURL: 'content://com.android.contacts/contacts/688/photo'}
    ];

    promise.then(() => {
      expect(TEST_DISPATCH.calledWithMatch({ type: 'GOT_CONTACTS', contacts: EXPECTED_CONTACTS})).to.equal(true);
      done();
    }).catch(e => done(e));
  });
});

