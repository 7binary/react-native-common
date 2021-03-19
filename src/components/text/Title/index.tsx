import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

interface Props {
  iconName?: string | undefined;
  title: string;
  subtitle?: string | null | undefined;
  forward?: boolean;
  date?: string | null;
}

export const Title: React.FC<Props> = ({ iconName, title, subtitle, forward, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={styles.titleColumn}>
          {iconName ? <Ionicons name={iconName} style={styles.titleIcon}/> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
        {forward ? <Ionicons name='ios-arrow-forward' style={styles.forwardIcon}/> : null}
      </View>

      {subtitle && subtitle.length > 0 ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {date ? <Text style={styles.date}>{date}</Text> : null}
    </View>
  );
};
