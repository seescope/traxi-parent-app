import { TEST_INAPPROPRIATE_DOMAIN_DATA, TEST_DB_RESPONSE } from '../Mocks';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

/*
const RESULT_FROM_SQL =  { category: 'adult', domain: 'redtube.com' }
                         { category: 'adult', domain: 'playboy.com' }
                         { category: 'adult', domain: 'redtube.com' }
             */
const MOCK_SQLITE = { openDatabase: () => Promise.resolve(MOCK_DATABASE), enablePromise: () => {} };
const MOCK_DATABASE = { executeSql: () => Promise.resolve(TEST_DB_RESPONSE) };

const { getCategories } = proxyquire.noCallThru()('../../App/Utils/Categorisation', {
  'react-native-sqlite-storage': MOCK_SQLITE,
});

describe('Categorisation', () => {
  it('returns an object containing each domain and an array of categories', (done) => {
    const domains = TEST_INAPPROPRIATE_DOMAIN_DATA.domain_report;
    getCategories(domains).then(categories => {
      const EXPECTED_CATEGORIES = {
        'redtube.com': ['adult'],
        'porn.com': ['adult'],
        'radiohead.com': [],
      };

      expect(categories).to.eql(EXPECTED_CATEGORIES);

      done();
    }).catch(e => done(e));
  })
});
