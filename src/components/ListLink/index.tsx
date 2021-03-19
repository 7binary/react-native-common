import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import styles from './styles';

interface Props {
  navigate?: string;
  navigateParams?: {[key: string]: any};
  iconName?: string | undefined;
  title?: string | number | null | undefined;
  context?: string | number | null | undefined;
  subtitle?: string | number | null | undefined;
}

export const ListLink: React.FC<Props> = ({
  navigate, navigateParams, iconName, title, context, subtitle,
}) => {
  const navigation = useNavigation();
  const openScreen = () => navigate && navigation.navigate(navigate, navigateParams);

  return (
    <TouchableOpacity style={styles.box} onPress={openScreen}>
      <View style={styles.boxColumn}>
        {iconName !== undefined && <Ionicons name={iconName} style={styles.boxIcon}/>}
        {title !== undefined && <Text style={styles.boxTitle}>{title}</Text>}
      </View>
      <View style={styles.boxColumn}>
        {context !== undefined && <Text style={styles.boxContext}>{context}</Text>}
        {subtitle !== undefined && <Text>{subtitle}</Text>}
        <Ionicons name='ios-arrow-forward' style={styles.boxForward}/>
      </View>
    </TouchableOpacity>
  );
};
