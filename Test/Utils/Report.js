import { expect } from 'chai';
import { checkTime, checkInappropriate, checkSocialMedia, sanitiseDomains } from '../../App/Utils/Report';
import * as Mocks from '../Mocks';

describe('Report utilities', () => {
  it('time: bad', () => {
    const { status, badTimes, time } = checkTime(Mocks.TEST_BAD_TIME_DATA.time_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('bad');
    expect(badTimes).to.eql(['h0','h1', 'h2', 'h3']);
    expect(time).to.eql(Mocks.TEST_BAD_TIME_DATA.time_report);
  });

  it('time: good', () => {
    const { status, badTimes, time } = checkTime(Mocks.TEST_GOOD_TIME_DATA.time_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('good');
    expect(badTimes).to.eql([]);
    expect(time).to.eql(Mocks.TEST_GOOD_TIME_DATA.time_report);
  });

  it('inappropriate: bad', () => {
    const { status, inappropriateDomains } = checkInappropriate(Mocks.TEST_INAPPROPRIATE_DOMAIN_DATA.domain_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('bad');
    expect(inappropriateDomains).to.eql(['redtube.com', 'porn.com']);
  });

  it('inappropriate: good', () => {
    const { status, inappropriateDomains } = checkInappropriate(Mocks.TEST_APPROPRIATE_DOMAIN_DATA.domain_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('good');
    expect(inappropriateDomains).to.eql([]);
  });

  it('social media: bad', () => {
    const { status, socialMediaPercentage } = checkSocialMedia(Mocks.TEST_EXCESSIVE_SOCIAL_MEDIA_DATA.domain_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('bad');
    expect(socialMediaPercentage).to.equal(.75);
  });

  it('social media: good', () => {
    const { status, socialMediaPercentage } = checkSocialMedia(Mocks.TEST_ACCEPTABLE_SOCIAL_MEDIA_DATA.domain_report, Mocks.TEST_CATEGORIES);
    expect(status).to.equal('good');
    expect(socialMediaPercentage).to.equal(.25);
  });

  it('sanitises domain names', () => {
    const DIRTY_DOMAINS = { 'facebook%2Ecom': 15, 'radiohead%2Ecom': 10 };
    const EXPECTED_DOMAINS = { 'facebook.com': 15, 'radiohead.com': 10 };
    const CLEAN_DOMAINS = sanitiseDomains(DIRTY_DOMAINS);

    expect(CLEAN_DOMAINS).to.eql(EXPECTED_DOMAINS);
  });

  it('doesnt blow up with empty data', () => {
    checkTime([]);
    checkSocialMedia([], []);
    checkInappropriate([], []);
    sanitiseDomains(undefined);
  });

});
