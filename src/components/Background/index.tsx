import React from 'react';
import { ImageBackground, ImageStyle } from 'react-native';

import { Settings } from '@config/Settings';

interface Props {
  children: any;
  center?: boolean;
}

export const Background: React.FC<Props> = ({ children, center = false }) => {
  const source = Settings.config.backgroundImage;

  if (!source) {
    return children;
  }

  let style: ImageStyle = {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  };
  if (center) {style = {
    ...style,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };}

  return (
    <ImageBackground source={source} style={style}>
      {children}
    </ImageBackground>
  );
};
