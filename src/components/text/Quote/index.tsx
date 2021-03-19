import React from 'react';
import { Text, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import styles from './styles';

export const Quote: React.FC<{children: any}> = ({ children }) => {
  return (
    <View style={styles.commentBlock}>
      <EntypoIcon name="quote" style={styles.commentIcon}/>
      <Text style={styles.commentText}>{children}</Text>
    </View>
  );
};
