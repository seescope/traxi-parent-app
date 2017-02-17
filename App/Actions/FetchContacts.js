import Contacts from 'react-native-contacts';
import { PhoneNumberType, PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
// eslint-disable-next-line
import Locale from 'react-native-locale';

const getCountryCode = () => {
  const locale = Locale.constants();

  // The Locale library is guaranteed to produce a string like 'en_AU', this should be safe.
  return locale.localeIdentifier.split('_')[1];
};

// Take a phone number and convert it to a format our SMS API will be happy with.
const parseNumber = (result, { number }) => {
  // If we've already found a valid number, just return that.
  if (result !== null) return result;

  const phoneUtil = PhoneNumberUtil.getInstance();
  let phoneNumber;

  try {
    phoneNumber = phoneUtil.parse(number, getCountryCode());
  } catch (error) {
    // This is normal; some of the phone numbers will be junk.
    return null;
  }

  // Not valid: return null.
  if (!phoneUtil.isValidNumber(phoneNumber)) return null;

  // Not a mobile number: return null.
  if (phoneUtil.getNumberType(phoneNumber) !== PhoneNumberType.MOBILE) return null;

  // This is probably a valid number! Return it.
  return phoneUtil.format(phoneNumber, PhoneNumberFormat.E164);
};

const parseContact = contact => {
  const { givenName, familyName, phoneNumbers, thumbnailPath } = contact;

  // As we have multiple phone numbers, use reduce to get a single, valid number back.
  // TODO: If there are two valid mobile numbers, we'll just return the first. This may be an issue.
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
      });
  };

export default fetchContacts;
