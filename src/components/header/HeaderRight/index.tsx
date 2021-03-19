import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { Settings } from '@config/Settings';
import styles from './styles';

interface Props {
  onLogout: () => void;
}

export const HeaderRight: React.FC<Props> = ({ onLogout }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {Settings.config.sidemenu ? (
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="ios-notifications-outline" style={Settings.config.headerIcon}/>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onLogout}>
          <Ionicons name="ios-log-out-outline" style={Settings.config.headerIcon}/>
        </TouchableOpacity>
      )}
    </View>
  );
};
