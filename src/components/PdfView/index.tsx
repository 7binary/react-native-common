import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

import styles from './styles';

export const PdfView: React.FC<{uri: string}> = ({ uri }) => {
  const source = { uri, cache: true };

  return (
    <View style={styles.container}>
      <Pdf source={source} style={styles.pdf}/>
    </View>
  );
};
