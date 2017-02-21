import React, { PropTypes } from 'react';
import STYLES from '../Constants/Styles';
import { TRAXI_BLUE, TRAXI_LIGHT_BLUE } from '../Constants/Colours';
// eslint-disable-next-line
import LinearGradient from 'react-native-linear-gradient';

const Background = ({ style, children }) => (
  <LinearGradient
    colors={[TRAXI_BLUE, TRAXI_LIGHT_BLUE]}
    style={style || STYLES.CONTAINER}
  >
    {children}
  </LinearGradient>
);

Background.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

export default Background;
