import React from 'react';
import { View, Text } from 'react-native';

export const MKButton = {
  coloredButton: () => ({
    withBackgroundColor: backgroundColour => ({
      withTextStyle: style => ({
        withText: text => ({
          withOnPress: onPress => ({
            build: () => () => (
              <View
                onPress={onPress}
                style={{ backgroundColor: backgroundColour }}
              >
                <Text style={style}>{text}</Text>
              </View>
            ),
          }),
        }),
      }),
    }),
  }),
};
