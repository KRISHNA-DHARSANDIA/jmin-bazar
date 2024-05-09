/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { Icons } from '../assets/Icon/Icons';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import { TabActions } from '@react-navigation/native';

//screen
import HomeScreen from '../screens/homeScreen/HomeScreen';
import UserInfo from '../screens/userInfo/UserInfo';
import UserLike from '../screens/UserLike';
import Tab1Screen from '../screens/Tab2Screen';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f6fb',
            borderRadius: 35,
            width: 70,
            height: 70,
            ...styles.shadow,
        }}
        onPress={onPress}
    >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            backgroundColor: '#01b862',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const TabButton = (props) => {

    const navigation = useNavigation();

    const { item, onPress, accessibilityState } = props;
    const { selected } = accessibilityState;
    const viewRef = useRef(null);

    const routeName = item.route;

    // useEffect(() => {
    //     if (selected) {
    //         if (routeName === 'HomeScreen') {
    //             navigation.dispatch(DrawerActions.jumpTo('TabsDrawer'));
    //         } else if (routeName === 'UserLike') {
    //             navigation.dispatch(DrawerActions.jumpTo('UserLikeDrawer'));
    //             navigation.dispatch(TabActions.jumpTo('UserLike'));
    //         }
    //         console.log("Selected Route Name:", routeName);
    //     }
    // }, [selected, routeName, navigation]);

    useLayoutEffect(() => {
        viewRef.current.animate({
            0: { scale: selected ? 1 : 1.2 },
            1: { scale: selected ? 1.2 : 1 },
        });
    }, [selected]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container]}>
            <Animatable.View
                ref={viewRef}
                duration={300}>
                <View style={[styles.btn, { width: 64 }]}>
                    {/* <View style={{ backgroundColor: selected ? item.alphaClr : null, width: 6, height: 6, borderRadius: 3, marginBottom: 10 }} /> */}
                    <Icon size={23} type={item.type} name={selected ? item.activeIcon : item.inActiveIcon} color={selected ? Colors.primary : Colors.primaryLite} />
                    {/* <Text style={[styles.labeltxt, selected && styles.selectedLabel]}>{item.label}</Text> */}
                </View>
            </Animatable.View>
        </TouchableOpacity>
    );
};

export default function TabNavigator({ route }) {

    //const navigation = useNavigation();

    // let { initialTab } = route.params;

    // if (initialTab === undefined) {
    //     initialTab = 'HomeScreen';
    // }

    const TabArr = [
        { route: 'HomeScreen', label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
        // { route: 'Views', label: 'Property', type: Icons.MaterialCommunityIcons, activeIcon: 'island', inActiveIcon: 'island', component: Views, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
        {
            route: 'Search', label: 'Activity', type: Icons.Feather, activeIcon: 'search',
            inActiveIcon: 'search', component: Tab1Screen, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite,
        },
        { route: 'UserLike', label: 'Like', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: UserLike, color: Colors.primary, alphaClr: Colors.primaryMoreTransLite },
        { route: 'UserInfo', label: 'Profile', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: UserInfo, color: Colors.primaryMoreTransLite, alphaClr: Colors.primaryMoreTransLite },
    ];

    return (
        <Tab.Navigator
            shifting={true}
            initialRouteName={'HomeScreen'}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                    left: 20,
                    borderRadius: 20,
                    backgroundColor: 'rgba(246,247,252,1)',
                },
                animationEnabled: true,
            }}
        >
            {TabArr.map((item, index) => (
                <Tab.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarShowLabel: false,
                        // tabBarIcon: ({ focused }) => (
                        //     <Icon size={28} type={item.type} name={focused ? item.activeIcon : item.inActiveIcon}
                        //         style={{
                        //             color: 'red',
                        //             justifyContent: 'center',
                        //             alignItems: 'center',
                        //         }}
                        //     />
                        // ),
                        tabBarButton: (props) => (
                            // item.route === 'Search' ? (
                            //     <CustomTabBarButton {...props} />
                            // ) : (
                            //     <TabButton {...props} item={item} />
                            // )
                            (<TabButton {...props} item={item} />)
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    labeltxt: {
        fontSize: 12,
        color: Colors.textlight,
    },
    btn: {
        flexDirection: 'column',
        alignItems: 'center',
        // paddingHorizontal: 14,
        // paddingVertical: 14,
        // borderBottomLeftRadius: 22,
        // borderBottomRightRadius: 22,
    },
});
