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

import NavigationContext from './NavigationContext';

const Drawer = createDrawerNavigator();

const CustomeDrawerContent = (props) => {
  const { navigation } = props;

  const { routeNames, index } = props.state;
  const focused = routeNames[index];

  console.log(focused);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={'Home'}
        onPress={() => navigation.navigate('HomeScreen')}
      //focused={focused === 'HomeScreen'}
      />
      <DrawerItem
        label={'New Projects'}
        onPress={() => navigation.navigate('Views')}
      />
      <DrawerItem
        label={'Add New Property'}
        onPress={() => navigation.navigate('AddProperty')}
      />
      <DrawerItem
        label={'Search Properties'}
        onPress={() => navigation.navigate('Search')}
      />
      <DrawerItem
        label={'Shortlists'}
        onPress={() => navigation.navigate('UserLike')}
      />
      <DrawerItem
        label={'Profile'}
        onPress={() => navigation.navigate('UserInfo')}
      />
    </DrawerContentScrollView>
  );
};

export default function DrawerNavigator(props) {

  const { currentScreen, setCurrentScreen } = useContext(NavigationContext);

  useEffect(() => {
    props.navigation.navigate(currentScreen);
  }, [currentScreen]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
    //drawerContent={props => <CustomeDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}
        listeners={{ drawerItemPress: () => setCurrentScreen('Home') }}
      />
      <Drawer.Screen
        name="Views"
        component={TabNavigator}
        options={{ headerShown: false }}
        initialParams={{ screen: 'Views' }}
        listeners={{
          drawerItemPress: () => setCurrentScreen('Views'),
        }}
      />
    </Drawer.Navigator>
  );
};