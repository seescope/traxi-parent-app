import Contacts from 'react-native-contacts';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const getCountryCode = () => 'AU';

// Take a phone number and convert it to a format our SMS API will be happy with.
const parseNumber = (result, { number }) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  const phoneNumber = phoneUtil.parse(number, getCountryCode());

  if (!phoneUtil.isValidNumber(phoneNumber)) return null;

  return phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);
};

const parseContact = contact => {
  const { givenName, familyName, phoneNumbers, thumbnailPath } = contact;
  const phoneNumber = phoneNumbers
    .reduce(parseNumber, null);

  return {
    name: `${givenName} ${familyName}`,
    phoneNumber,
    avatarURL: thumbnailPath,
  };
};

// Some contacts might not even have a phone number, so just filter them out.
const isValidContact = contact =>
  typeof(contact.phoneNumber) === 'string'

// Fetch contacts from the database, parse them and then dispatch
// a GOT_CONTACTS action.
const fetchContacts = () =>
  (dispatch) => {
    const parseContacts = new Promise((resolve, reject) =>
      Contacts.getAll((error, contacts) => {
        if (error) { reject(error); }

        const parsedContacts = contacts
          .map(parseContact)
          .filter(isValidContact);

        resolve(parsedContacts);
      })
    );

    return parseContacts.then(
      contacts => {
        dispatch({ type: 'GOT_CONTACTS', contacts });
      }).catch(e => console.error('Error fetching contacts', e));
  };

export default fetchContacts;
