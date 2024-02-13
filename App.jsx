/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Navigation

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { TamaguiProvider } from 'tamagui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import config from './tamagui.config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from 'react-native-toast-notifications';


const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some loading time (e.g., fetching data, initializing resources)
    setTimeout(() => {
      setLoading(false);
    },0); // Adjust the timeout as needed
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
