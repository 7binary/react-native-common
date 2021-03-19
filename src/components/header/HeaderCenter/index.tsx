import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface Props {
  logoImage: Source;
}

export const HeaderCenter: React.FC<Props> = ({logoImage}) => {
  const navigation = useNavigation();
  const navigateDashboard = () => navigation.navigate('DashboardNav', {
    screen: 'DashboardTabs',
    params: { screen: 'Dashboard' },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateDashboard}>
        <FastImage
          source={logoImage}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};
