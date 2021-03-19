import React from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';

interface Props {
  children: any;
  containerStyle?: ViewStyle;
  extraOffset?: boolean; // extraOffset для экранов с верхними табами
}

export const KeyboardView: React.FC<Props> = ({ children, containerStyle, extraOffset }) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const offset = extraOffset ? 112 : 64;
  return (
    <ScrollView keyboardShouldPersistTaps="always" style={containerStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={offset}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
