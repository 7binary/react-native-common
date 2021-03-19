import React from 'react';
import { StatusBar } from 'react-native';

import { Settings } from '@config/Settings';

export const StatusBarDark = () => (
  <StatusBar
    barStyle={Settings.config.statusbarDark.barStyle}
    backgroundColor={Settings.config.statusbarDark.backgroundColor}
  />
);
