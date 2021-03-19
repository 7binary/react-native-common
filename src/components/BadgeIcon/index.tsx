import React from 'react';
import { Text, TextStyle, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconButtonProps } from 'react-native-vector-icons/Icon';

import { Settings } from '@config/Settings';

interface Props {
  badge: number;
  badgeTheme: 'dark' | 'light';
  iconProps: IconButtonProps;
}

export const BadgeIcon: React.FC<Props> = ({ badge, badgeTheme, iconProps }) => {
  const isDarkTheme = badgeTheme && badgeTheme === 'dark';
  const backgroundColor = isDarkTheme
    ? Settings.config.headerBadge.darkTheme.bgColor
    : Settings.config.headerBadge.lightTheme.bgColor;
  const borderColor = isDarkTheme
    ? Settings.config.headerBadge.darkTheme.borderColor
    : Settings.config.headerBadge.lightTheme.borderColor;
  const fontSize = 12;

  const badgeStyle: TextStyle = {
    borderColor,
    backgroundColor,
    fontSize,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    lineHeight: 18,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
    textAlign: 'center',
    position: 'absolute',
    top: -8,
    right: -4,
  };

  return (
    <View>
      <Ionicons {...iconProps}/>
      {badge > 0 && <Text style={badgeStyle}>{badge}</Text>}
    </View>
  );
};
