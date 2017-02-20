import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { TEST_KID, TEST_REPORT, TEST_STATE } from '../Mocks.js';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const FETCH_REPORTS_SPY = sinon.spy();

const ReportHome = proxyquire.noCallThru()('../../App/ReportHome', {
  './ReportItems': View,
  './Header': View,
  '../Actions/FetchReports': FETCH_REPORTS_SPY,
  'react-native-viewpager': View,
});

const {
  ReportHomeComponent,
  buildProps,
  mapStateToProps,
  mapDispatchToProps,
} = ReportHome;

describe('<ReportHome/>', () => {
  it('component renders', () => {
    const report = {
      alerts: [],
      goodBehaviour: [],
    };

    const props = {
      report,
      status: 'good',
      date: '2016-01-01',
      fetchReports: FETCH_REPORTS_SPY,
      kid: TEST_KID,
    };

    const wrapper = shallow(<ReportHomeComponent {...props} />);
    expect(wrapper.children()).to.have.length(3);
  });

  it('builds the correct props', () => {
    const TEST_DATE = '2016-07-10';
    const { status, date, report, kid } = buildProps(
      TEST_KID,
      TEST_STATE.reports,
      TEST_DATE,
    );

    expect(date).to.equal(TEST_DATE);
    expect(status).to.equal('bad');
    expect(report).to.eql(TEST_REPORT[TEST_DATE]);
    expect(kid).to.equal(TEST_KID);
  });

  it('maps state to props', () => {
    const TEST_STATE = { reports: 'a', selectedKid: 'b' };
    const props = mapStateToProps(TEST_STATE);
    const expectedProps = { reports: 'a', kid: 'b' };
    expect(props).to.eql(expectedProps);
  });

  it('maps dispatch to props', () => {
    const TEST_DISPATCH = sinon.spy();
    const { fetchReports } = mapDispatchToProps(TEST_DISPATCH);
    fetchReports();

    expect(TEST_DISPATCH).to.have.been.calledOnce;
    expect(FETCH_REPORTS_SPY).to.have.been.calledOnce;
  });

  it('should show a loading state when there are no reports', () => {
    const props = {
      date: '2016-01-01',
      kid: TEST_KID,
      report: null,
      status: 'good',
    };

    const wrapper = shallow(<ReportHomeComponent {...props} />);
    expect(wrapper.children()).to.have.length(2);
  });
});
