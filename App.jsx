/* eslint-disable prettier/prettier */
import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'

const App = () => {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
