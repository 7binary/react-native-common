import React, { useState } from 'react';
import { InteractionManager } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const LazyView: React.FC<{children: any}> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => setHidden(false));
    }, []),
  );

  return hidden ? null : children;
};

export default LazyView;
