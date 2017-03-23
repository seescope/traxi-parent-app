import React from 'react';
import { ScrollView, } from 'react-native';

import Spacing from '../Components/Spacing';
import { VERY_LIGHT_GREY } from '../Constants/Colours';
import KidCircle from './Components/KidCircle';
import Card from './Components/Card';
import TopApp from './Components/TopApp';
import TopCategory from './Components/TopCategory';
import PeakTime from './Components/PeakTime';
import RecentApp from './Components/RecentApp';

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

const topApps = [
  {
    name: 'Facebook',
    minutesUsed: 57,
    logo: LOGOS.facebook,
  },
  {
    name: 'Audible',
    minutesUsed: 23,
    logo: LOGOS.audible,
  },
];

const topCategories = [
  {
    name: 'Games',
    minutesUsed: 57,
  },
  {
    name: 'Tools',
    minutesUsed: 23,
  },
];

const peakTimes = [
  {
    name: '9AM - 10AM',
    minutesUsed: 53,
  },
  {
    name: '4PM - 5PM',
    minutesUsed: 27,
  }
];

const recentApps = [
  {
    name: 'Facebook',
    minutesAgo: 57,
    logo: LOGOS.facebook,
  },
  {
    name: 'Audible',
    minutesAgo: 23,
    logo: LOGOS.audible,
  }
];


export default () =>
  <ScrollView style={outerContainerStyle} contentContainerStyle={containerStyle}>
    <KidCircle minutesUsed={130} />

    <Spacing height={32} />

    <Card header="Top Apps" Component={TopApp} data={topApps} />

    <Card header="Top Categories" Component={TopCategory} data={topCategories} />

    <Card header="Peak Times" Component={PeakTime} data={peakTimes} />

    <Card header="Recent Apps" Component={RecentApp} data={recentApps} />
  </ScrollView>
