import { Platform, StatusBar } from 'react-native';

import { Settings } from '@config/Settings';

export const setStatusbarLight = () => {
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(Settings.config.statusbarLight.backgroundColor);
  }
  StatusBar.setBarStyle(Settings.config.statusbarLight.barStyle);
};
