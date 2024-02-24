/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import FirstLoad from '../screens/firstLoad/FirstLoad';
import TabNavigator from './TabNavigator';
import SearchUserData from '../screens/searchUserData/SearchUserData';
import AddProperty from '../screens/addProperty/AddProperty';
import MapLocation from '../screens/mapScreen/MapLocation';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return (
        <Stack.Navigator initialRouteName="FirstLoad">
            <Stack.Screen name="FirstLoad" component={FirstLoad} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SearchUserData" component={SearchUserData} options={{ headerTitle: null }} />
            <Stack.Screen name="AddProperty" options={{ headerShown: false }}>
                {props => <AddProperty {...props} scrollY={scrollY} />}
            </Stack.Screen>
            <Stack.Screen name="MapLocation" component={MapLocation} options={{ headerShown: true, headerTitle: 'Mark Location on Map' }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
