import React from 'react';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';

//screen
import SearchUserData from '../screens/searchUserData/SearchUserData';
import AddProperty from '../screens/addProperty/AddProperty';
import TabNavigator from './TabNavigator';
import UserLike from '../screens/UserLike';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProperties from '../screens/myProperties/MyProperties';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} initialParams={{ initialTab: 'HomeScreen' }} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="UserLikeDrawer" component={TabNavigator} initialParams={{ initialTab: 'UserLike' }} options={{ headerShown: true }} /> */}
      <Drawer.Screen name="My Properties" component={MyProperties} />
    </Drawer.Navigator>
  );
}