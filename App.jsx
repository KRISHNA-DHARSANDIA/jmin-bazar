/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

import { TamaguiProvider } from 'tamagui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import config from './tamagui.config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationProvider } from './navigation/NavigationContext';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ToastProvider offsetBottom={90}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <TamaguiProvider config={config}>
            <SafeAreaProvider>
              <NavigationProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </NavigationProvider>
            </SafeAreaProvider>
          </TamaguiProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ToastProvider>
  );
};


export default App;
