import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
  children: any;
  paddingTop?: number;
}

export const TextHeader: React.FC<Props> = ({ children, paddingTop }) => (
  <View style={styles.container}>
    <Text style={{ ...styles.text, paddingTop }}>
      {children}
    </Text>
  </View>
);
