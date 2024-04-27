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
import MapLocation from '../screens/mapScreen/MapLocation';
// import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// const OtherScreenStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="AddProperty" component={AddProperty} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

export default function DrawerNavigator(props) {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />

      <Drawer.Screen name="MyProperties" component={MyProperties}
        options={{
          headerTitle: 'My Properties',
          drawerLabel: 'My Properties',
        }} />

      {/* <Drawer.Screen name="AddProperty" component={AddProperty} options={{
        headerTitle: 'Add Property',
        drawerLabel: 'Add Property',
      }} /> */}

      <Drawer.Screen name="UserLikeDrawer" component={UserLike} options={{ headerShown: true }} />

    </Drawer.Navigator>
  );
}