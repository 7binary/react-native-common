import React from 'react';
import { Checkbox } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';

import { Settings } from '@config/Settings';
import { ErrorMessage } from '@components/form/ErrorMessage';
import styles from './styles';

interface Props {
  field: {name: string, value: boolean};
  form: {errors: {[s: string]: string}, touched: {[s: string]: string}};
  label: string;
  handlePress: () => void;
}

export const FormCheckbox: React.FC<Props> = ({
  field: { name, value },
  form: { errors },
  label,
  handlePress,
}) => {
  const errorMsg = errors[name] || null;

  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Checkbox.Android
          status={value ? 'checked' : 'unchecked'}
          theme={Settings.theme}
        />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </View>
  );
};
