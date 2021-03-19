import React from 'react';
import { Checkbox } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';

import { Settings } from '@config/Settings';
import styles from './styles';

interface Props {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

export const AndroidCheckbox: React.FC<Props> = ({ label, isChecked, onPress }) => (
  <View style={styles.box}>
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Checkbox.Android
        status={isChecked ? 'checked' : 'unchecked'}
        theme={Settings.theme}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  </View>
);
