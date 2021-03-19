import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import { getFirstError } from './getFirstError';

interface Props {
  children: any
  dot?: boolean;
}

export const ErrorMessage: React.FC<Props> = ({ children, dot }) => {
  let error = children;
  const type = typeof children;
  const fontSize = dot ? 15 : 12;
  const marginLeft = dot ? 0 : 10;
  let marginBottom = 0;

  if (children) {
    if (Array.isArray(children)) {
      error = children[0];
    } else if (type === 'function') {
      error = children();
    } else if (type === 'object' && !!children) {
      error = getFirstError(children);
    }
  }

  if (dot) {
    if (!error) {
      return null;
    }
    if (error && typeof error === 'string') {
      error = `• ${error}`;
      marginBottom = 15;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.errorText, fontSize, marginLeft, marginBottom }}>{error}</Text>
    </View>
  );
};

