// @flow
import React from 'react';
import { View } from 'react-native';
import Spacing from '../Components/Spacing';
import BodyText from '../Components/BodyText';

type Props = {
  kidName: string
};

export default ({ kidName }: Props) => (
  <View>
    <BodyText>
      Now that
      {' '}
      {kidName}
      &apos;s device is being monitored by traxi, you can see what apps they&apos;re using on their device.
    </BodyText>

    <Spacing />

    <BodyText>
      After
      {' '}
      {kidName}
      {' '}
      has used an app for more than a 60 seconds, you'll be able to see it with Traxi.
    </BodyText>

    <Spacing />

    <BodyText>
      To show you how this works, open an app on
      {' '}
      {kidName}
      &apos;s device and use it until the bar turns green.
    </BodyText>

    <Spacing height={32} />
  </View>
);
