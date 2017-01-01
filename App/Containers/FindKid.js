import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import BodyText from '../Components/BodyText';
import HeaderText from '../Components/HeaderText';
import KidSuggestions from '../Components/KidSuggestions';
import { searchForKid, selectKid } from '../Actions/Actions';
import { NEUTRAL, WHITE, TRAXI_BLUE } from '../Constants/Colours';
import Background from '../Components/Background';
import Spacing from '../Components/Spacing';
import LoadingIndicator from '../Components/LoadingIndicator';
import fetchContacts from '../Actions/FetchContacts';

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const FindKidStyle = {
  container: {
    backgroundColor: TRAXI_BLUE,
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loading: {
    marginTop: 64,
    width: width - 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: width - 32,
    color: isIOS ? NEUTRAL : WHITE,
    fontWeight: 'normal',
    fontSize: isIOS ? 16 : 13,
    backgroundColor: isIOS ? '#EEE' : 'transparent',
    borderRadius: isIOS ? 6 : 0,
    height: isIOS ? 32 : null,
    padding: isIOS ? 8 : 0,
    marginBottom: 13,
  },
};

export const mapStateToProps = (state) => (
  {
    contacts: state.contacts,
    parentName: state.parentName,
    kidSuggestions: state.kidSuggestions,
  }
);

export const mapDispatchToProps = (dispatch) => (
  {
    getContacts: () => dispatch(fetchContacts()),
    onSearchForKid: (hint) => dispatch(searchForKid(hint)),
    onSelectKid: (kid) => {
      dispatch(selectKid(kid));
      Actions.sendSMS();
    },
  }
);


class FindKidComponent extends React.Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const {
      parentName,
      contacts,
      onSearchForKid,
      kidSuggestions,
      onSelectKid,
    } = this.props;

    return (
      <Background style={FindKidStyle.container}>
        <HeaderText>
          {`Find your child, ${parentName}`}
        </HeaderText>

        <Spacing />

        {contacts.length > 0 && <BodyText>
          Start typing their name in the box below
        </BodyText>}

        <Spacing />

        {contacts.length > 0 &&
          <TextInput
            autoCorrect={false}
            placeholderTextColor={isIOS ? NEUTRAL : WHITE}
            underlineColorAndroid={WHITE}
            autoCapitalize={'words'}
            style={FindKidStyle.textInput}
            onChangeText={onSearchForKid}
            placeholder={'eg. Jen Smith'}
          /> ||
          <View style={FindKidStyle.loading}>
            <LoadingIndicator>Just one second..</LoadingIndicator>
          </View>
        }

        <KidSuggestions kidSuggestions={kidSuggestions} onPress={onSelectKid} />
      </Background>
    );
  }
}

FindKidComponent.propTypes = {
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  parentName: PropTypes.string.isRequired,
  onSearchForKid: PropTypes.func.isRequired,
  kidSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectKid: PropTypes.func.isRequired,
};

const FindKid = connect(mapStateToProps, mapDispatchToProps)(FindKidComponent);

export default FindKid;
