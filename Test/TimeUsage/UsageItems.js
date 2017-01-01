import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { GOOD, WHITE } from '../../App/Constants/Colours';

const { UsageItems, UsageItem } = proxyquire.noCallThru()('../../App/TimeUsage/UsageItems', {
  'react-native-router-flux': { Actions: {} },
});

const TEST_REPORT = [
  {
    label: '10AM',
    minutes: 15,
    apps: [
      { label: 'YouTube', minutes: 5 },
      { label: 'Facebook', minutes: 5 },
      { label: 'Twitter', minutes: 5 },
    ],
  },
  {
    label: '12PM',
    minutes: 15,
    apps: [
      { label: 'YouTube', minutes: 5 },
      { label: 'Facebook', minutes: 5 },
      { label: 'Twitter', minutes: 5 },
    ],
  },
  {
    label: '1AM',
    minutes: 0,
  },
  {
    label: '2AM',
    minutes: 0,
  },
  {
    label: '2AM',
    minutes: 0,
  },
];

describe('<UsageItems>', () => {
  it('renders a list of UsageItems', () => {
    const wrapper = shallow(<UsageItems report={TEST_REPORT} />);
    expect(wrapper.children()).to.have.length(TEST_REPORT.length);
  });
});


const REPORT = TEST_REPORT[0];
const EMPTY_REPORT = TEST_REPORT[2];
const APP_REPORT = REPORT.apps[0];
const usageItemWrapper = shallow(<UsageItem report={REPORT} />);
const emptyUsageWrapper = shallow(<UsageItem report={EMPTY_REPORT} />);
const appItemWrapper = shallow(<UsageItem report={APP_REPORT} />);

describe('<UsageItem>', () => {
  it('renders a single UsageItem', () => {
    expect(usageItemWrapper.children()).to.have.length(3);
  });


  it('renders the correct label', () => {
    expect(usageItemWrapper.childAt(0)).to.have.prop('children', REPORT.label);
  });

  it('renders the correct sub label', () => {
    const EXPECTED_SUB_LABEL = 'YouTube, Facebook, Twitter';
    expect(usageItemWrapper.childAt(2)).to.have.prop('children', EXPECTED_SUB_LABEL);
  });

  it('should not have a bar chart with empty data', () => {
    expect(emptyUsageWrapper.children()).to.have.length(2);
  });

  it('should have green text when there is empty data', () => {
    expect(emptyUsageWrapper.childAt(0).prop('style').color).to.equal(GOOD);
  });

  it('should have a "No usage" label when there is empty data', () => {
    const EXPECTED_SUB_LABEL = 'No usage';
    expect(emptyUsageWrapper.childAt(1)).to.have.prop('children', EXPECTED_SUB_LABEL);
  });

  it('should have a "5 minutes" label for an app report', () => {
    const EXPECTED_SUB_LABEL = '5 minutes';
    expect(appItemWrapper.childAt(2)).to.have.prop('children', EXPECTED_SUB_LABEL);
  });

  it('should have white text when for an app report', () => {
    expect(appItemWrapper.childAt(0).prop('style').color).to.equal(WHITE);
  });
});
