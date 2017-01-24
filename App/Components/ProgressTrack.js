import React, { PropTypes } from 'react';
import { View, Text, Easing, Animated } from 'react-native';
import { GOOD, WHITE, NEUTRAL, TRAXI_BLUE } from '../Constants/Colours';
import KidAvatar from './KidAvatar';

const TRACK_COLOUR = WHITE;
const TRACK_THICKNESS = 4;
const STAGES = [0, 1, 2, 3];

const containerStyle = {
  zIndex: 100,
  height: 50,
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'row',
};

const trackStyle = width => ({
  top: 11,
  position: 'absolute',
  backgroundColor: TRACK_COLOUR,
  height: TRACK_THICKNESS,
  width,
});

class ProgressTrack extends React.Component {
  constructor(props) {
    super(props);

    this.circleStyles = STAGES.map(() => ({
      alignItems: 'center',
      justifyContent: 'center',
      height: 26,
      width: 26,
      borderRadius: 13,
      backgroundColor: WHITE,
    }));

    this.textStyles = STAGES.map(() => ({
      fontWeight: 'bold',
      fontSize: 20,
      color: TRAXI_BLUE,
    }));
  }

  componentDidMount() {
    this.animateTracks();
  }

  componentDidUpdate() {
    this.animateTracks();
  }

  getProgressTrackStyle() {
    return {
      completedTrack: {
        backgroundColor: this.props.state === 'neutral' ? NEUTRAL : GOOD,
        height: TRACK_THICKNESS,
        width: this.state.completedTrackWidth,
      },
    };
  }

  animateTracks() {
    const { width, stage } = this.props;

    // Animated.parallel([
    //   Animated.timing(
    //     this.state.completedTrackWidth,
    //     {
    //       toValue: width * progress,
    //       easing: Easing.elastic(0.1),
    //     }
    //   ),
    //   Animated.timing(
    //     this.state.trackWidth,
    //     {
    //       toValue: width * (1 - progress),
    //       easing: Easing.elastic(0.1),
    //     }
    //   ),
    // ]).start();
  }

  render() {
    const { width } = this.props;
    return (
      <View style={{ width }}>
        <View style={containerStyle}>
          {STAGES.map(i => <View key={i} style={this.circleStyles[i]}>
            <Text style={this.textStyles[i]}>
              {i + 1}
            </Text>
          </View>)}
        </View>
        <View style={trackStyle(width)} />
      </View>
    );
  }
}

ProgressTrack.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['neutral', 'good']).isRequired,
};

export default ProgressTrack;

