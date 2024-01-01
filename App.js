/* eslint-disable prettier/prettier */
import React from 'react';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';


const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}

export default App;
