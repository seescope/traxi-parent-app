import { StyleSheet } from 'react-native';
import { WHITE, TRAXI_BLUE } from '../Constants/Colours';
import { isIOS } from '../Utils';

export default StyleSheet.create({
  CONTAINER: {
    flex: 1,
    backgroundColor: TRAXI_BLUE,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BOLD: {
    fontWeight: 'bold',
  },
  SPACING: {
    height: 13,
  },
  TEXT: {
    fontFamily: 'Raleway-Regular',
    color: WHITE,
    textAlign: 'left',
    fontWeight: isIOS ? '200' : 'normal',
    fontSize: isIOS ? 18 : 13,
    backgroundColor: 'transparent',
  },
});
