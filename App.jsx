/* eslint-disable prettier/prettier */
import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { TamaguiProvider } from 'tamagui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import config from './tamagui.config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from 'react-native-toast-notifications';

const App = () => {
  return (
    <ToastProvider offsetBottom={90}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <TamaguiProvider config={config}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </TamaguiProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
};

export default App;
