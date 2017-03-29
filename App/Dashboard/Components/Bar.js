import React from 'react';
import { Animated, Dimensions } from 'react-native';


export const getBarWidth = (max, val, maxWidth) =>
  maxWidth * (val / max);

const MINIMUM_SATURATION = 50;
const MAXIMUM_SATURATION = 100;

const getSaturation = (max, val) =>
  (MAXIMUM_SATURATION - MINIMUM_SATURATION) * (val / max);

export const getBarColour = (max, val) =>
  `hsl(218, ${getSaturation(max, val)}%, 63.5%)`;

const { width } = Dimensions.get('window');
const maxWidth = width - 32 - 96 - 16; 


class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.width = new Animated.Value(0);
  }

  componentDidMount() {
    const { max, val } = this.props;
    const newWidth = getBarWidth(max, val, maxWidth);
    Animated.spring(this.width, {
      toValue: newWidth,
    }).start();
  }

  render() {
    const { max, val } = this.props;

    const barStyle = {
      width: this.width,
      height: 16,
      backgroundColor: getBarColour(max, val),
      borderRadius: 4,
    }

    return <Animated.View style={barStyle} />;
  }
}

Bar.propTypes = {
  val: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default Bar;
