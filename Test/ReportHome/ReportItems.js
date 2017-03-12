import React from 'react';
import { View } from 'react-native';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const ReportItems = proxyquire.noCallThru()(
  '../../App/ReportHome/ReportItems',
  {
    'react-native-vector-icons/FontAwesome': View,
    'react-native-router-flux': { Actions: {} },
    'react-native-animatable': { View },
  },
).default;

const TEST_REPORTS = [
  {
    type: 'time',
    status: 'good',
  },
];

const wrapper = shallow(<ReportItems type={'alerts'} report={TEST_REPORTS} />);

describe('<ReportItems/>', () => {
  it('renders a list of report items', () => {
    expect(wrapper.children()).to.have.length(TEST_REPORTS.length + 1);
  });

  it('should be empty if there are no items', () => {
    const wrapper = shallow(<ReportItems type={'alerts'} report={[]} />);
    expect(wrapper.children()).to.have.length(0);
  });

  it('passes the correct status to its children', () => {
    const expected = TEST_REPORTS[0].status;
    expect(wrapper.childAt(1)).to.have.prop('status', expected);
  });

  it('renders a subheader', () => {
    expect(wrapper.childAt(0)).to.have.prop('children', 'Alerts');
  });
});
