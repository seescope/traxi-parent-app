import Contacts from 'react-native-contacts';

// Make sure that this is a mobile number we can send an SMS to.
// TODO: This is Australian only..
const isValidPhoneNumber = phoneNumber =>
  typeof phoneNumber === 'string' &&
  (phoneNumber.startsWith('+614') ||
   phoneNumber.startsWith('04') ||
   phoneNumber.startsWith('+61 4')
  );

// Take a phone number and convert it to a format our SMS API will be happy with.
const parseNumber = phoneNumber =>
  phoneNumber
    .replace(/\s/g, '')
    .replace(/-/g, '')
    .replace(/^04/, '+614');

const parseContact = contact => {
  const { givenName, familyName, phoneNumbers, thumbnailPath } = contact;
  const phoneNumber = phoneNumbers
    .map(p => p.number)
    .filter(isValidPhoneNumber)
    .map(parseNumber)[0];

  return {
    name: `${givenName} ${familyName}`,
    phoneNumber,
    avatarURL: thumbnailPath,
  };
};

// Some contacts might not even have a phone number, so just filter them out.
const isValidContact = contact =>
  typeof(contact.phoneNumber) === 'string';

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
