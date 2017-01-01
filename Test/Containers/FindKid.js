import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const TEST_ACTIONS = { sendSMS: sinon.spy() };
const TEST_SELECT_KID = sinon.spy();
const TEST_SEARCH_FOR_KID = sinon.spy();
const { FindKidComponent, mapStateToProps, mapDispatchToProps } = proxyquire.noCallThru()('../../App/Containers/FindKid', {
  'react-native-router-flux': { Actions: TEST_ACTIONS },
  '../Actions/Actions': {
    selectKid: TEST_SELECT_KID,
    searchForKid: TEST_SEARCH_FOR_KID,
  }
}); 

const TEST_KID_SUGGESTIONS = [
  { name: 'Brett Bastian', number: '+61401633346', avatarURL: 'https://www.wired.com/wp-content/uploads/archive/images/slideshow/magazine/1505/FF_raves_heroes1_f.jpg' },
  { name: 'Jen Bastian', number: '+61401633346', avatarURL: 'https://yoknyamdabale.files.wordpress.com/2012/02/530847_362873373757396_221256177919117_1086583_339624364_n.jpg' },
];
const TEST_NAME = 'TEST_NAME';

describe('<FindKid />', () => {
  it('renders the FindKid component', () => {
    const wrapper = shallow(<FindKidComponent 
                            parentName={TEST_NAME} 
                            onSearchForKid={sinon.spy()} 
                            kidSuggestions={[]}
                            onSelectKid={() => {}}
                            />);
    expect(wrapper.children().length).to.equal(4);
  });

  it('maps state to props correctly', () => {
    const TEST_STATE = {
      parentName: TEST_NAME,
      kidSuggestions: TEST_KID_SUGGESTIONS,
      irrelevantKey: 'derp',
    };

    const expectedProps = {
      parentName: TEST_NAME,
      kidSuggestions: TEST_KID_SUGGESTIONS,
    };

    expect(mapStateToProps(TEST_STATE)).to.eql(expectedProps);
  });

  it('maps dispatch to props correctly', () => {
    const dispatch = sinon.spy();
    const props = mapDispatchToProps(dispatch);
    
    props.onSearchForKid('Jen');
    expect(TEST_SEARCH_FOR_KID.calledWith('Jen')).to.equal(true);

    const TEST_KID = TEST_KID_SUGGESTIONS[0];
    props.onSelectKid(TEST_KID);
    
    expect(TEST_SELECT_KID.calledWith(TEST_KID)).to.equal(true);
    expect(TEST_ACTIONS.sendSMS.calledOnce).to.equal(true);
  });
});
