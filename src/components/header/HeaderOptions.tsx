import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';

import { Settings } from '@config/Settings';
import { HeaderCenter } from '@components/header/HeaderCenter';
import { HeaderLeft } from '@components/header/HeaderLeft';
import { HeaderRight } from '@components/header/HeaderRight';

const HeaderOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Settings.config.header.backgroundColor,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
  },
  headerTitle: () => <HeaderCenter logoImage={require('assets/images/logo-light.png')}/>,
  headerLeft: () => <HeaderLeft cartLength={0}/>,
  headerRight: () => <HeaderRight onLogout={() => {}}/>,
};

export default HeaderOptions;
