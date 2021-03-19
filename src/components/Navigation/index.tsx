import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ErrorHandler } from './ErrorHandler';

export const Navigation: React.FC<{profile_id: number | null}> = ({ children, profile_id }) => {
  const navigationRef = React.useRef(null);
  ErrorHandler.register(profile_id);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        // @ts-ignore
        ErrorHandler.screenName = navigationRef.current?.getCurrentRoute()?.name;
      }}
    >
      {children}
    </NavigationContainer>
  );
};
