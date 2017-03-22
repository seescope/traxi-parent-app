import React from 'react';
import { Dimensions, ScrollView, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle as SVGCircle } from 'react-native-svg';

import Spacing from '../Components/Spacing';
import { WHITE, TRAXI_BLUE, TRANSPARENT } from '../Constants/Colours';

const { width } = Dimensions.get('window');

const VERY_LIGHT_GREY = '#F0F2F7';
const LIGHT_GREY = '#A6A8AB';
const GREY = '#545454';
const LIGHT_BLUE = '#5E99FF';
// const DARK_GREY = '#16181A';

const containerStyle = {
  alignItems: 'center',
  paddingVertical: 36,
  paddingHorizontal: 8,
  backgroundColor: VERY_LIGHT_GREY,
};

const testKid = {
  "UUID" : "2628211b-0ce1-4593-ac3a-d2df35c10419",
  "avatarURL" : "https://avatars1.githubusercontent.com/u/2022375",
  "deviceType" : "Android",
  "name" : "Kane",
  "setupID" : 5406,
  "status" : "INSTALLED"
};

const cardStyle = {
  borderRadius: 4,
  width: width - 16,
  backgroundColor: WHITE,
  padding: 16,
  marginBottom: 24,
	shadowColor: "#000000",
	shadowOpacity: 0.16,
	shadowRadius: 3,
	shadowOffset: {
		height: 3,
		width: 3,
	}
};

const cardHeaderStyle = {
  color: GREY,
  fontSize: 19,
};

const headerUnderlineStyle = {
  height: 1,
  width: 80,
  backgroundColor: LIGHT_GREY,
  marginBottom: 24,
};

const LOGOS = {
  facebook: 'http://is3.mzstatic.com/image/thumb/Purple111/v4/cc/73/53/cc735371-ee27-d48d-c8cc-51cf6c85290e/source/512x512bb.jpg',
  audible: 'http://is1.mzstatic.com/image/thumb/Purple122/v4/4f/98/93/4f989348-2928-302a-36b5-6df9ccf2592a/source/512x512bb.jpg',
};

const logoStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 56,
  width: 56,
  marginRight: 24,
};

const rowStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
};

const innerTextStyle = {
};

const innerHeaderTextStyle = {
  fontSize: 15,
  fontWeight: '400',
};

const innerSubheaderTextStyle = {
  fontSize: 15,
  fontWeight: '200',
};

const downArrowContainer = {
  alignItems: 'flex-end',
};

const selectedTimeStyle = {
  fontSize: 15,
  fontWeight: '200',
  color: TRAXI_BLUE,
  textAlign: 'center',
  flex: 1,
};

const deselectedTimeStyle = {
  fontSize: 15,
  fontWeight: '200',
  textAlign: 'center',
  flex: 1,
};

const timeTextStyle = {
  width: 80,
};

const barStyle = {
  width: width - 32 - 96 - 16, 
  height: 16,
  backgroundColor: TRAXI_BLUE,
  borderRadius: 4,
};

const secondBarStyle = {
  width: (width - 32 - 96 - 16) / 2, 
  height: 16,
  backgroundColor: LIGHT_BLUE,
  borderRadius: 4,
};

const circleSize = width - 16;

const circleDonut = {
  transform: [{ rotate: '-90deg' }],
  zIndex: 1,
};
const kidAvatarSize = width - 32;

const usageOverlayStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: kidAvatarSize,
  width: kidAvatarSize,
  top: -circleSize + 8,
  marginBottom: -kidAvatarSize + 8,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  borderRadius: kidAvatarSize / 2,
};

const kidAvatar = {
  height: kidAvatarSize,
  width: kidAvatarSize,
  borderRadius: kidAvatarSize / 2,
  top: -circleSize + 8,
  marginBottom: -kidAvatarSize + 8,
};

const overlayTextHeaderStyle = {
  fontSize: 96,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontWeight: '100',
};

const overlayTextSubheaderStyle = {
  fontSize: 19,
  backgroundColor: TRANSPARENT,
  color: WHITE,
  fontWeight: '200',
};


const circleRadius = circleSize / 2;
const circleCircumference = Math.PI * (circleRadius * 2);

export default () =>
  <ScrollView contentContainerStyle={containerStyle}>
    <Svg width={circleSize + 4} height={circleSize + 4} style={circleDonut}>
      <SVGCircle
        r={circleRadius}
        cx={circleSize / 2}
        cy={circleSize / 2}
        strokeWidth={4}
        fill={TRANSPARENT}
        stroke={TRAXI_BLUE}
        strokeDasharray={[circleCircumference]}
        strokeDashoffset={circleCircumference / 3}
      />
    </Svg>

    <Image style={kidAvatar} source={{ uri: testKid.avatarURL }} />

    <View style={usageOverlayStyle}>
      <Text style={overlayTextHeaderStyle}>1.8</Text>
      <Text style={overlayTextSubheaderStyle}>hours online today</Text>
    </View>

    <Spacing height={32} />

    <View style={cardStyle}>
      <Text style={cardHeaderStyle}>Top Apps</Text>
      <View style={headerUnderlineStyle} />

      <View style={rowStyle}>
				<Text style={selectedTimeStyle}>Today</Text>
				<Text style={deselectedTimeStyle}>Last 7 Days</Text>
      </View>

      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.facebook }} style={logoStyle} />

        <View>
          <Text style={innerHeaderTextStyle}>Facebook</Text>
          <View style={barStyle} />
          <Text style={innerSubheaderTextStyle}>57 minutes</Text>
        </View>
      </View>

      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.audible }} style={logoStyle} />

        <View>
          <Text style={innerHeaderTextStyle}>Audible</Text>
          <View style={secondBarStyle} />
          <Text style={innerSubheaderTextStyle}>23 minutes</Text>
        </View>
      </View>

      <View style={downArrowContainer}>
        <Image source={require('../Images/down-arrow.png')} />
      </View>
    </View>

    <View style={cardStyle}>
      <Text style={cardHeaderStyle}>Top Categories</Text>
      <View style={headerUnderlineStyle} />

      <View style={rowStyle}>
				<Text style={selectedTimeStyle}>Today</Text>
				<Text style={deselectedTimeStyle}>Last 7 Days</Text>
      </View>

      <View style={rowStyle}>
        <Icon style={logoStyle} name="gamepad" size={52} color={GREY} />

        <View>
          <Text style={innerHeaderTextStyle}>Games</Text>
          <View style={barStyle} />
          <Text style={innerSubheaderTextStyle}>57 minutes</Text>
        </View>
      </View>

      <View style={rowStyle}>
        <Icon style={logoStyle} name="wrench" size={52} color={GREY} />

        <View style={innerTextStyle}>
          <Text style={innerHeaderTextStyle}>Tools</Text>
          <View style={secondBarStyle} />
          <Text style={innerSubheaderTextStyle}>23 minutes</Text>
        </View>
      </View>

      <View style={downArrowContainer}>
        <Image source={require('../Images/down-arrow.png')} />
      </View>
    </View>

    <View style={cardStyle}>
      <Text style={cardHeaderStyle}>Peak Times</Text>
      <View style={headerUnderlineStyle} />

      <View style={rowStyle}>
				<Text style={selectedTimeStyle}>Today</Text>
				<Text style={deselectedTimeStyle}>Last 7 Days</Text>
      </View>

      <View style={rowStyle}>
        <View style={timeTextStyle}>
          <Text style={innerHeaderTextStyle}>9AM - 10AM</Text>
          <Text style={innerSubheaderTextStyle}>57 minutes</Text>
        </View>
        <View style={barStyle} />
      </View>

      <Spacing height={16} />

      <View style={rowStyle}>
        <View style={timeTextStyle}>
          <Text style={innerHeaderTextStyle}>6PM - 7PM</Text>
          <Text style={innerSubheaderTextStyle}>23 minutes</Text>
        </View>
        <View style={secondBarStyle} />
      </View>

      <View style={downArrowContainer}>
        <Image source={require('../Images/down-arrow.png')} />
      </View>
    </View>

    <View style={cardStyle}>
      <Text style={cardHeaderStyle}>Recent Apps</Text>
      <View style={headerUnderlineStyle} />

      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.facebook }} style={logoStyle} />
        <View style={innerTextStyle}>
          <Text style={innerHeaderTextStyle}>Facebook</Text>
          <Text style={innerSubheaderTextStyle}>15 minutes ago</Text>
        </View>
      </View>

      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.audible }} style={logoStyle} />
        <View style={innerTextStyle}>
          <Text style={innerHeaderTextStyle}>Audible</Text>
          <Text style={innerSubheaderTextStyle}>23 minutes ago</Text>
        </View>
      </View>

      <View style={downArrowContainer}>
        <Image source={require('../Images/down-arrow.png')} />
      </View>
    </View>
  </ScrollView>
