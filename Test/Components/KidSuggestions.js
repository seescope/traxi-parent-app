import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import KidSuggestions from '../../App/Components/KidSuggestions';

const TEST_KID_SUGGESTIONS = [
  { name: 'Brett Bastian', phoneNumber: '+61401633346', avatarURL: 'https://www.wired.com/wp-content/uploads/archive/images/slideshow/magazine/1505/FF_raves_heroes1_f.jpg' },
  { name: 'Jen Bastian', phoneNumber: '+61401633346', avatarURL: 'https://yoknyamdabale.files.wordpress.com/2012/02/530847_362873373757396_221256177919117_1086583_339624364_n.jpg' },
];
const onPress = sinon.spy();
const wrapper = shallow(<KidSuggestions kidSuggestions={TEST_KID_SUGGESTIONS} onPress={onPress} />);

describe('<KidSuggestions />', () => {
  it('renders a list of suggested kids', () => {
    expect(wrapper.children().length).to.equal(TEST_KID_SUGGESTIONS.length);
  });

  it('calls the onPress handler on each kid suggestion', () => {
    wrapper.children().forEach(w => w.simulate('press'));
    TEST_KID_SUGGESTIONS.forEach(k => expect(onPress.calledWith(k)).to.equal(true));
  });
});
