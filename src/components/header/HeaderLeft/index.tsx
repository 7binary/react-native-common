import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { Settings } from '@config/Settings';
import { BadgeIcon } from '@components/BadgeIcon';
import styles from './styles';

interface Props {
  cartLength?: number;
  unreaded?: number;
  sidemenu?: boolean;
}

export const HeaderLeft: React.FC<Props> = ({ cartLength = 0, unreaded = 0, sidemenu = false }) => {
  const navigation = useNavigation();
  const openCart = () => navigation.navigate('PrizesNav', {
    screen: 'PrizesTabs',
    params: { screen: 'Cart' },
  });

  return (
    <View style={styles.container}>
      {sidemenu ? (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="ios-menu-outline" style={Settings.config.headerIcon}/>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <BadgeIcon
            iconProps={{ name: 'ios-notifications-outline', style: Settings.config.headerIcon }}
            badge={unreaded || 0}
            badgeTheme="dark"
          />
        </TouchableOpacity>
      )}

      {cartLength > 0 ? (
        <TouchableOpacity onPress={openCart}>
          <BadgeIcon
            iconProps={{ name: 'ios-cart-outline', style: Settings.config.headerIcon }}
            badge={cartLength}
            badgeTheme="dark"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
