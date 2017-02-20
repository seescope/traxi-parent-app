import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';

const TEST_IMAGE = { uri: 'test' };

// We need proxyquire here as otherwise the call to 'require' for the image will fail.
const Instructions = proxyquire.noCallThru()(
  '../../App/Components/Instructions',
  {
    '../Images/step-1.png': TEST_IMAGE,
    './Button': () => {},
  },
).default;

describe('<Instructions />', () => {
  it('renders step 1', () => {
    const wrapper = shallow(
      <Instructions step={1} kidName={'Brett'} nextStep={() => {}} />,
    );
    expect(wrapper.childAt(0).childAt(0).prop('children')).to.equal(
      `Open the SMS on Brett's phone and tap the link`,
    );
    expect(wrapper.childAt(1).children().prop('source')).to.equal(TEST_IMAGE);
  });
});
