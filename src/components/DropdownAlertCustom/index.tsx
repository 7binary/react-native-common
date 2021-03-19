import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownAlert, { AlertDataType } from 'react-native-dropdownalert';

import { Settings } from '@config/Settings';
import { DropdownAlertService } from '@services/DropdownAlertService';
import styles from './styles';

export const DropdownAlertCustom: React.FC<{isDark?: boolean}> = ({ isDark = true }) => {
  const bgColor = isDark
    ? Settings.config.statusbarDark.backgroundColor
    : Settings.config.statusbarLight.backgroundColor;

  return (
    <DropdownAlert
      ref={(ref: DropdownAlert) => DropdownAlertService.set(ref)}
      closeInterval={4000}
      inactiveStatusBarStyle={isDark
        ? Settings.config.statusbarDark.barStyle
        : Settings.config.statusbarLight.barStyle
      }
      inactiveStatusBarBackgroundColor={bgColor}
      infoColor="steelblue"
      successColor="seagreen"
      warnColor="orange"
      errorColor="maroon"
      onTap={(alertData: AlertDataType | any) => {
        const { payload: { onTap } } = alertData;
        if (typeof onTap === 'function') {
          onTap();
        }
      }}
      renderImage={(props, state) => {
        switch (state.type) {
          case 'success':
            return <Ionicons name="ios-checkmark" style={styles.leftIcon}/>;
          case 'info':
            return <Ionicons name="ios-information-circle-outline" style={styles.leftIcon}/>;
          default:
            return <Ionicons name="ios-warning" style={styles.leftIcon}/>;
        }
      }}
      renderCancel={() => {
        return <Ionicons name="ios-close" style={styles.closeIcon}/>;
      }}
      showCancel={true}
      titleNumOfLines={10}
      messageNumOfLines={0}
    />
  );
};
