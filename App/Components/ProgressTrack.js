import React, { PropTypes } from 'react';
import { View, Easing, Animated } from 'react-native';
import { GOOD, WHITE, NEUTRAL } from '../Constants/Colours';
import KidAvatar from './KidAvatar';

const TRACK_COLOUR = WHITE;
const TRACK_WIDTH = 3;


class ProgressTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedTrackWidth: new Animated.Value(0),
      trackWidth: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animateTracks();
  }

  componentDidUpdate() {
    this.animateTracks();
  }

  getProgressTrackStyle() {
    return {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
      },
      completedTrack: {
        backgroundColor: this.props.state === 'neutral' ? NEUTRAL : GOOD,
        height: TRACK_WIDTH,
        width: this.state.completedTrackWidth,
      },
      track: {
        backgroundColor: TRACK_COLOUR,
        height: TRACK_WIDTH,
        width: this.state.trackWidth,
      },
    };
  }

  animateTracks() {
    const { width, progress } = this.props;

    Animated.parallel([
      Animated.timing(
        this.state.completedTrackWidth,
        {
          toValue: width * progress,
          easing: Easing.elastic(0.1),
        }
      ),
      Animated.timing(
        this.state.trackWidth,
        {
          toValue: width * (1 - progress),
          easing: Easing.elastic(0.1),
        }
      ),
    ]).start();
  }

  render() {
    const style = this.getProgressTrackStyle();
    const { avatarURL, state } = this.props;
    return (
      <View style={style.container}>
        <Animated.View style={style.completedTrack} />
        <KidAvatar
          animation="pulse"
          duration={2000}
          iterationCount="infinite"
          avatarURL={avatarURL}
          state={state}
          size={50}
        />
        <Animated.View style={style.track} />
      </View>
    );
  }
}

ProgressTrack.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['neutral', 'good']).isRequired,
};

export default ProgressTrack;

