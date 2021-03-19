import { Platform, StatusBar } from 'react-native';

import { Settings } from '@config/Settings';

export const setStatusbarDark = () => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Settings.config.statusbarDark.barStyle);
  }
  StatusBar.setBarStyle(Settings.config.statusbarDark.barStyle);
};
