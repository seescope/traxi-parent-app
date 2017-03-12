import { TEST_CONTACTS_LIST } from '../Test/Mocks';

export default {
  getAll: callback => callback(null, TEST_CONTACTS_LIST),
};
