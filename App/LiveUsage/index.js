import React, { PropTypes } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TRAXI_ORANGE, NEUTRAL } from '../Constants/Colours';
import Firebase from 'firebase';
import Background from '../Components/Background';
import { firstName, isIOS } from '../Utils';

const liveUsage = {
  paddingTop: 64,
  alignItems: 'center',
  flex: 1,
  backgroundColor: 'white',
};


const headerText = {
  color: NEUTRAL,
  textAlign: 'center',
  fontWeight: '300',
  fontSize: isIOS ? 42 : 18,
  marginBottom: 8,
  backgroundColor: 'transparent',
};

const activityIndicatorStyle = {
  marginBottom: 32,
};

class LiveUsage extends React.Component {
  constructor(props) {
    super(props);
    const { UUID } = props.kid;
    this.state = {
      domains: [],
    };
    this.firebase = new Firebase(`https://traxiapp.firebaseio.com/kids/${UUID}/live`);
  }

  componentDidMount() {
    this.firebase.on('child_added', data => {
      const newDomain = data.val().d;
      this.setState({ domains: [newDomain, ...this.state.domains] });
    });
  }

  render() {
    const kidName = firstName(this.props.kid.name);
    return (
      <Background style={liveUsage}>
        <ActivityIndicator size="large" color={TRAXI_ORANGE} style={activityIndicatorStyle} />
        {this.state.domains.length === 0 &&
          <Animatable.Text style={headerText} animation="fadeInDown">
            Connecting to {kidName}'s device..
          </Animatable.Text>}
        {this.state.domains.map((d, i) =>
          <Animatable.Text key={i} style={headerText} animation="fadeInDown">{d}</Animatable.Text>)
        }
      </Background>
    );
  }
}

LiveUsage.propTypes = {
  kid: PropTypes.object.isRequired,
};

export default LiveUsage;
