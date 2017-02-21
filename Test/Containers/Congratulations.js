import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import { TEST_KID } from '../Mocks';

const {
  CongratulationsComponent,
  mapStateToProps,
} = proxyquire.noCallThru()('../../App/Containers/Congratulations', {
  'react-native-router-flux': { Actions: {} },
  '../Components/KidAvatar': () => {},
  '../Components/Button': () => {},
});

describe('<Congratulations />', () => {
  it('renders the Congratulations component', () => {
    const wrapper = shallow(<CongratulationsComponent kid={TEST_KID} />);

    expect(wrapper.childAt(0).prop('avatarURL')).to.equal(TEST_KID.avatarURL);
    expect(wrapper.childAt(2).prop('children')[0]).to.equal(
      TEST_KID.name.split(' ')[0],
    );
    expect(wrapper.childAt(3).prop('children')[1]).to.equal(
      TEST_KID.name.split(' ')[0],
    );
  });

  it('maps state to props', () => {
    const TEST_STATE = {
      selectedKid: TEST_KID,
      blah: 'garbage',
    };
    const props = mapStateToProps(TEST_STATE);

    expect(props).to.eql({ kid: TEST_KID });
  });
});
