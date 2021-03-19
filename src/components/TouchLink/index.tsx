import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

interface Props {
  onPress: () => void;
  icon?: string | undefined;
}

export const TouchLink: React.FC<Props> = ({ onPress, icon, children }) => {
  let LeftIcon = null;
  if (typeof icon === 'string') {
    LeftIcon = icon.includes('ios-') || icon.includes('md-')
      ? <Ionicons name={icon} style={styles.icon}/>
      : <IconFA name={icon} style={styles.icon}/>;
  }

  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      {LeftIcon}
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  );
};
