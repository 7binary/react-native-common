import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Settings } from '@config/Settings';
import styles from './styles';

export interface Props {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

export const CheckboxRadio: React.FC<Props> = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name={isChecked ? 'radio-button-on' : 'radio-button-off'}
        color={isChecked ? Settings.colors.accent : 'grey'}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
