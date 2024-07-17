import React, { useEffect, useContext } from 'react';
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

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
import { useNavigationState } from '@react-navigation/native';
import Tab2Screen from '../screens/Tab2Screen';
//import { CustomeDrawerContent } from './CustomeDrawerContent';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// import NavigationContext from './NavigationContext';

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {

  //const { currentScreen, setCurrentScreen } = useContext(NavigationContext);

  // useEffect(() => {
  //   props.navigation.navigate(currentScreen);
  // }, [props.navigation, currentScreen]);

  return (
    <Drawer.Navigator initialRouteName="HomeDrawer">
      <Drawer.Screen
        name="HomeDrawer"
        component={TabNavigator}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Drawer.Screen
        name="MyProperties"
        component={MyProperties}
        options={{ headerShown: true, title: 'Your Property' }}
      />
      {/* <Drawer.Screen
        name="ViewsDrawer"
        component={TabNavigator}
        options={{ headerShown: false, label: 'Views' }}
        initialParams={{ screen: 'ViewsTab' }}
        listeners={{
          drawerItemPress: () => setCurrentScreen('ViewsTab'),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;