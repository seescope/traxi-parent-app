import React from 'react';
import { View } from 'react-native';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const {
  HeaderComponent,
  subHeaderText,
} = proxyquire.noCallThru()('../../App/ReportHome/Header', {
  'react-native-animatable': { View },
  'react-native-router-flux': { Actions: {} },
  '../Components/Button': () => View,
});

import { TEST_KID, TEST_KID_FIRST_NAME } from '../Mocks.js';

describe('<Header/>', () => {
  it('component renders', () => {
    const props = {
      status: 'good',
      date: '2016-01-01',
      kid: TEST_KID,
      kids: [],
      switchKid: () => {},
    };
    const wrapper = shallow(<HeaderComponent {...props} />);
    expect(wrapper.children()).to.have.length(1);
  });
});

describe('subHeaderText', () => {
  it('good state', () => {
    const status = 'good';
    const actual = subHeaderText(TEST_KID, status);
    const expected = `No inappropriate activity for ${TEST_KID_FIRST_NAME}`;
    expect(actual).to.equal(expected);
  });

  it('bad state', () => {
    const status = 'bad';
    const actual = subHeaderText(TEST_KID, status);
    const expected = `Inappropriate activity detected for ${TEST_KID_FIRST_NAME}`;
    expect(actual).to.equal(expected);
  });
});
