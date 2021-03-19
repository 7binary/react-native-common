import { StackNavigationOptions } from '@react-navigation/stack';

import { Settings } from '@config/Settings';

export const HeaderPopupOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Settings.config.header.backgroundColor,
  },
  headerTintColor: '#FAFAFA',
  headerTitleStyle: {
    fontWeight: 'normal',
    fontSize: 16,
  },
};
