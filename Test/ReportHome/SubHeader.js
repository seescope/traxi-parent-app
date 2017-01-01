import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow } from 'enzyme';
import SubHeader from '../../App/ReportHome/SubHeader';

describe ('<SubHeader>', () => {
  it('renders correctly', () => {
    const testText = 'Test Text';
    const wrapper = shallow(<SubHeader>{testText}</SubHeader>);
    expect(wrapper.children()).to.have.prop('children', testText);
  });
});
