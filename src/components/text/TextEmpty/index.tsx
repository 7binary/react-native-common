import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
  length: number;
  text?: string;
}

export const TextEmpty: React.FC<Props> = ({ length, text = 'Не найдено' }) => {
  if (length > 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};
