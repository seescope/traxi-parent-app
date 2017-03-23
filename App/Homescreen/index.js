import React from 'react';
import { Dimensions, ScrollView, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Spacing from '../Components/Spacing';
import { GREY, VERY_LIGHT_GREY, LIGHT_BLUE, TRAXI_BLUE } from '../Constants/Colours';
import KidCircle from './Components/KidCircle';
import Card from './Components/Card';

const { width } = Dimensions.get('window');

const containerStyle = {
  alignItems: 'center',
  paddingVertical: 36,
  paddingHorizontal: 8,
  backgroundColor: VERY_LIGHT_GREY,
};

const outerContainerStyle = {
  backgroundColor: VERY_LIGHT_GREY,
};


const LOGOS = {
  facebook: 'http://is3.mzstatic.com/image/thumb/Purple111/v4/cc/73/53/cc735371-ee27-d48d-c8cc-51cf6c85290e/source/512x512bb.jpg',
  audible: 'http://is1.mzstatic.com/image/thumb/Purple122/v4/4f/98/93/4f989348-2928-302a-36b5-6df9ccf2592a/source/512x512bb.jpg',
};

const logoStyle = {
  borderRadius: 8,
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
  height: 56,
};

const innerHeaderTextStyle = {
  fontSize: 15,
  fontWeight: '400',
};

const innerSubheaderTextStyle = {
  fontSize: 15,
  fontWeight: '200',
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


export default () =>
  <ScrollView style={outerContainerStyle} contentContainerStyle={containerStyle}>
    <KidCircle />

    <Spacing height={32} />

    <Card header="Top Apps">

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
    </Card>

    <Card header="Top Categories">
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

        <View>
          <Text style={innerHeaderTextStyle}>Tools</Text>
          <View style={secondBarStyle} />
          <Text style={innerSubheaderTextStyle}>23 minutes</Text>
        </View>
      </View>
    </Card>

    <Card header="Peak Times">
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
    </Card>

    <Card header="Recent Apps">
      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.facebook }} style={logoStyle} />
        <View>
          <Text style={innerHeaderTextStyle}>Facebook</Text>
          <Text style={innerSubheaderTextStyle}>15 minutes ago</Text>
        </View>
      </View>

      <View style={rowStyle}>
        <Image source={{ uri: LOGOS.audible }} style={logoStyle} />
        <View>
          <Text style={innerHeaderTextStyle}>Audible</Text>
          <Text style={innerSubheaderTextStyle}>23 minutes ago</Text>
        </View>
      </View>

    </Card>
  </ScrollView>
