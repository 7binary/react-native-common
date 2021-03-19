import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface Props {
  status: string;
  children: any;
}

export const StatusLabel: React.FC<Props> = (props) => {
  let backgroundColor = '#DDD';
  let color = '#333';

  switch (props.status) {
    case 'declined':
    case 'denied':
      backgroundColor = 'maroon';
      color = 'white';
      break;

    case 'redo':
    case 'rollback':
      backgroundColor = 'orange';
      color = 'white';
      break;

    case 'processing':
    case 'ordered':
    case 'partially_ready':
    case 'delivery':
      backgroundColor = 'skyblue';
      break;

    case 'approved':
    case 'paid':
    case 'ready':
    case 'completed':
      backgroundColor = 'green';
      color = 'white';
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.status, backgroundColor, color }}>
        {props.children}
      </Text>
    </View>
  );
};
