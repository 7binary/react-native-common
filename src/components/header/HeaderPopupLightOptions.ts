import { StackNavigationOptions } from '@react-navigation/stack';

import { Settings } from '@config/Settings';

export const HeaderPopupLightOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: Settings.config.header.backgroundColor,
  headerTitleStyle: {
    fontWeight: 'normal',
    fontSize: 16,
  },
};
