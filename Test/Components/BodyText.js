import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BodyText from '../../App/Components/BodyText';

describe('<BodyText>', () => {
  it('renders text', () => {
    const TEST_TEXT = 'Test Text';
    const wrapper = shallow(<BodyText>{TEST_TEXT}</BodyText>);
    expect(wrapper.children().text()).to.equal(TEST_TEXT);
  });
});
