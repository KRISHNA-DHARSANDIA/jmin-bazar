/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstLoad from '../screens/firstLoad/FirstLoad';
import TabNavigator from './TabNavigator';
import SearchUserData from '../screens/searchUserData/SearchUserData';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="FirstLoad">
            <Stack.Screen name="FirstLoad " component={FirstLoad} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SearchUserData" component={SearchUserData} options={{headerTitle: null }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
