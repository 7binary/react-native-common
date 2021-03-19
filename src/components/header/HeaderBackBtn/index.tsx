import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

export const HeaderBackBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <HeaderBackButton labelVisible={false} tintColor="white"/>
    </TouchableOpacity>
  );
};
