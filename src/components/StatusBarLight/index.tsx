import React from 'react';
import { StatusBar } from 'react-native';

import { Settings } from '@config/Settings';

export const StatusBarLight = () => (
  <StatusBar
    barStyle={Settings.config.statusbarLight.barStyle}
    backgroundColor={Settings.config.statusbarLight.backgroundColor}
  />
);
